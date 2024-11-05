import { TRPCError } from "@trpc/server";
import { and, desc, ilike, sql } from "drizzle-orm";
import { z, ZodError } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { businesses, vehicles } from "~/server/db/schema";

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
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        maxDistance: z.number().default(10), // km
        vehicleType: z
          .enum([
            "bike",
            "e-bike",
            "scooter",
            "e-scooter",
            "car",
            "e-car",
            "others",
          ])
          .optional(),
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
      if (input.latitude && input.longitude) {
        return shops
          .filter((shop) => {
            const shopLocation = shop.location as {
              latitude: number;
              longitude: number;
            };
            const distance = calculateDistance(
              input.latitude!,
              input.longitude!,
              shopLocation.latitude,
              shopLocation.longitude,
            );
            return distance <= input.maxDistance;
          })
          .sort((a, b) => {
            const aLocation = a.location as {
              latitude: number;
              longitude: number;
            };
            const bLocation = b.location as {
              latitude: number;
              longitude: number;
            };
            const distanceA = calculateDistance(
              input.latitude!,
              input.longitude!,
              aLocation.latitude,
              aLocation.longitude,
            );
            const distanceB = calculateDistance(
              input.latitude!,
              input.longitude!,
              bLocation.latitude,
              bLocation.longitude,
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
        name: z.string(),
        location: z.object({
          latitude: z.number(),
          longitude: z.number(),
          address: z.string(),
          map: z.string(),
        }),
        phoneNumbers: z.string().array(),
        businessHours: z.record(z.string(), z.set(z.string()).size(2)),
        availableVehicleTypes: z.array(
          z.enum([
            "bike",
            "e-bike",
            "scooter",
            "e-scooter",
            "car",
            "e-car",
            "others",
          ]),
        ),
        logo: z.string(),
        images: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const business = await ctx.db.insert(businesses).values({
          name: input.name,
          location: input.location,
          phoneNumbers: input.phoneNumbers,
          businessHours: input.businessHours,
          availableVehicleTypes: input.availableVehicleTypes,
          logo: input.logo,
          images: input.images,
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
});

export type BusinessRouter = typeof businessRouter;
