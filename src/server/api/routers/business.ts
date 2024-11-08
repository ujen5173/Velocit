import { TRPCError } from "@trpc/server";
import { and, desc, eq, ilike, sql } from "drizzle-orm";
import { z, ZodError } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  businesses,
  users,
  vehicles,
  vehicleTypeEnum,
} from "~/server/db/schema";

// Helper function to calculate distance using Haversine formula
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const businessRouter = createTRPCRouter({
  getStoreName: protectedProcedure.query(async ({ ctx }) => {
    const business = await ctx.db
      .select({
        name: businesses.name,
      })
      .from(businesses)
      .where(eq(businesses.ownerId, ctx.session.user.id));

    return business[0]?.name;
  }),
  current: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.businesses.findFirst({
      where: eq(businesses.ownerId, ctx.session.user.id),
    });
  }),
  // Get popular shops based on rating
  getPopularShops: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        id: businesses.id,
        name: businesses.name,
        location: businesses.location,
        rating: businesses.rating,
        ratingCount: businesses.ratingCount,
        logo: businesses.logo,
      })
      .from(businesses)
      .where(
        and(sql`${businesses.rating} > 0`, sql`${businesses.ratingCount} > 0`),
      )
      .orderBy(sql`(${businesses.rating} * ${businesses.ratingCount}) DESC`)
      .limit(8);
  }),

  // Search shops with location and availability
  search: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        lat: z.number().optional(),
        lng: z.number().optional(),
        maxDistance: z.number().default(10), // km
        vehicleType: z.enum(vehicleTypeEnum.enumValues).optional(),
        hasAvailableVehicles: z.boolean().default(true),
      }),
    )
    .query(async ({ ctx, input }) => {
      const shops = await ctx.db
        .select({
          id: businesses.id,
          name: businesses.name,
          location: businesses.location,
          rating: businesses.rating,
          ratingCount: businesses.ratingCount,
          logo: businesses.logo,
          availableVehicles: sql<number>`(
            SELECT COUNT(*)::integer 
            FROM VehicleRental_vehicle v 
            WHERE v.business_id = ${businesses.id} 
            AND v.is_available = true
            ${input.vehicleType ? sql`AND v.type = ${input.vehicleType}` : sql``}
          )`,
        })
        .from(businesses)
        .where(
          and(
            input.query
              ? ilike(businesses.name, `%${input.query}%`)
              : undefined,
            input.hasAvailableVehicles
              ? sql`EXISTS (
                  SELECT 1 
                  FROM VehicleRental_vehicle v 
                  WHERE v.business_id = ${businesses.id} 
                  AND v.is_available = true
                  ${input.vehicleType ? sql`AND v.type = ${input.vehicleType}` : sql``}
                )`
              : undefined,
          ),
        );

      // Filter by distance if coordinates provided
      if (input.lat && input.lng) {
        return shops
          .filter((shop) => {
            const shopLocation = shop.location as {
              lat: number;
              lng: number;
            };
            const distance = calculateDistance(
              input.lat!,
              input.lng!,
              shopLocation.lat,
              shopLocation.lng,
            );
            return distance <= input.maxDistance;
          })
          .sort((a, b) => {
            const aLocation = a.location as {
              lat: number;
              lng: number;
            };
            const bLocation = b.location as {
              lat: number;
              lng: number;
            };
            const distanceA = calculateDistance(
              input.lat!,
              input.lng!,
              aLocation.lat,
              aLocation.lng,
            );
            const distanceB = calculateDistance(
              input.lat!,
              input.lng!,
              bLocation.lat,
              bLocation.lng,
            );
            return distanceA - distanceB;
          });
      }

      return shops;
    }),

  // Get all shops with infinite query
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.db
        .select({
          id: businesses.id,
          name: businesses.name,
          location: businesses.location,
          rating: businesses.rating,
          ratingCount: businesses.ratingCount,
          logo: businesses.logo,
          availableVehicles: sql<number>`(
            SELECT COUNT(*)::integer 
            FROM VehicleRental_vehicle v 
            WHERE v.business_id = ${businesses.id} 
            AND v.is_available = true
          )`,
        })
        .from(businesses)
        .where(
          input.cursor ? sql`${businesses.id} > ${input.cursor}` : undefined,
        )
        .orderBy(desc(businesses.id))
        .limit(input.limit + 1);

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  // Get multiple vehicles
  getVehicles: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(vehicles)
        .where(sql`${vehicles.id} = ANY(${input.ids})`);
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(2).max(50),
        location: z.object({
          map: z.string().url(),
          lat: z.number(),
          lng: z.number(),
          address: z.string().min(2).max(50),
          city: z.string().min(2).max(50),
        }),
        phoneNumbers: z.array(z.string().min(10).max(15)),
        businessHours: z.record(
          z.string().min(2).max(50),
          z.object({
            open: z.string().min(2).max(50),
            close: z.string().min(2).max(50),
          }),
        ),
        availableVehicleTypes: z.array(z.enum(vehicleTypeEnum.enumValues)),
        logo: z.string().url(),
        images: z.array(z.string().url()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const business = await ctx.db.insert(businesses).values({
          ...input,
          ownerId: ctx.session.user.id,
        });

        return business;
      } catch (error) {
        // check for zod error, trpc error, database error, etc.
        if (error instanceof TRPCError) {
          throw error;
        } else if (error instanceof ZodError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid input",
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unknown error",
        });
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().nullable(),
        location: z.object({
          map: z.string().url().optional(),
          lat: z.number().optional(),
          lng: z.number().optional(),
          address: z.string().min(2).optional(),
          city: z.string().min(2).optional(),
        }),
        phoneNumbers: z.array(z.string().min(10).max(15)).default([]),
        businessHours: z.record(
          z.string().min(2).max(50),
          z
            .object({
              open: z.string().min(2).max(50),
              close: z.string().min(2).max(50),
            })
            .nullable(),
        ),
        availableVehicleTypes: z
          .array(z.enum(vehicleTypeEnum.enumValues))
          .default([]),
        logo: z.string().url().nullable(),
        images: z.array(z.string().url()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedBusiness = await ctx.db
          .update(businesses)
          .set({ ...input })
          .where(eq(businesses.ownerId, ctx.session.user.id))
          .returning();
        await ctx.db
          .update(users)
          .set({ vendor_setup_complete: null })
          .where(eq(users.id, ctx.session.user.id));
        return updatedBusiness[0];
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid input data",
            cause: error.issues,
          });
        }
        console.error("Unexpected error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),
});

export type BusinessRouter = typeof businessRouter;
