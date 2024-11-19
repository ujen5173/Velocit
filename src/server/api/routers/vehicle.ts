import { type inferRouterOutputs } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { businesses, vehicles, vehicleTypeEnum } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const vehicleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          businessId: z.string(),
          name: z.string(),
          type: z.enum(vehicleTypeEnum.enumValues).optional().default("bike"),
          category: z.string().min(1),
          images: z.array(z.string()),
          basePrice: z.number(),
          inventory: z.number().default(1),
          features: z.array(
            z.object({
              key: z.string(),
              value: z.string(),
            }),
          ),
        }),
        editId: z.string().optional(),
        type: z.enum(["edit", "new"]).optional().default("new"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { data, editId, type } = input;

      try {
        const businesss = await ctx.db.query.businesses.findFirst({
          where: eq(businesses.id, data.businessId),
        });

        if (!businesss) {
          throw new Error("Business not found");
        }

        if (type === "edit" && editId) {
          const updated = await ctx.db
            .update(vehicles)
            .set({
              ...data,
            })
            .where(eq(vehicles.id, editId));

          return updated;
        } else {
          const vehicle = await ctx.db.insert(vehicles).values({
            // due to new schema pushed...
            ...data,
          });

          return vehicle;
        }
      } catch (error) {
        console.log({ error });
      }
    }),

  getSingle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const vehicle = await ctx.db.query.vehicles.findFirst({
          where: eq(vehicles.id, input.id),
        });

        return vehicle;
      } catch (error) {
        console.log({ error });
      }
    }),

  getVendorVehicles: protectedProcedure.query(async ({ ctx }) => {
    try {
      const businessId = await ctx.db.query.businesses.findFirst({
        where: eq(businesses.ownerId, ctx.session.user.id),
      });

      if (!businessId) {
        throw new Error("Business not found");
      }

      const result = await ctx.db.query.vehicles.findMany({
        where: eq(vehicles.businessId, businessId.id),
      });

      return result;
    } catch (error) {
      console.log({ error });
    }
  }),

  getBusinessVehicles: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const vehicles = await ctx.db.query.businesses.findFirst({
          where: eq(businesses.slug, input.slug),
          columns: {},
          with: {
            vehicles: {
              columns: {
                images: true,
                id: true,
                name: true,
                // slug: true,
                basePrice: true,
                type: true,
                category: true,
              },
            },
          },
        });

        if (!vehicles) {
          throw new Error("Business not found");
        }
        return vehicles.vehicles;
      } catch (error) {
        console.log({ error });
      }
    }),
});

export type GetSingleVehicleType = inferRouterOutputs<
  typeof vehicleRouter
>["getSingle"];
export type GetBusinessVehicleType = inferRouterOutputs<
  typeof vehicleRouter
>["getVendorVehicles"];
