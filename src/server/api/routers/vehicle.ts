import { eq } from "drizzle-orm";
import { z } from "zod";
import { businesses, vehicles, vehicleTypeEnum } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const vehicleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        businessId: z.string(),
        name: z.string(),
        type: z.enum(vehicleTypeEnum.enumValues),
        images: z.array(z.string()),
        basePrice: z.number(),
        numberOfVehicles: z.number().default(1),
        discountedPrice: z.number().optional(),
        longRidesAvailable: z.boolean(),
        mileage: z.number(),
        model: z.string(),
        year: z.number(),
        features: z.unknown(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const businesss = await ctx.db.query.businesses.findFirst({
          where: eq(businesses.id, input.businessId),
        });

        if (!businesss) {
          throw new Error("Business not found");
        }

        const vehicle = await ctx.db.insert(vehicles).values({
          ...input,
        });

        return vehicle;
      } catch (error) {
        console.log({ error });
      }
    }),
});
