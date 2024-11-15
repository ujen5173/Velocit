import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { rentals, rentalStatusEnum, vehicles } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const rentalRouter = createTRPCRouter({
  rent: protectedProcedure
    .input(
      z.object({
        vehicleId: z.string(),
        startDate: z.date(),
        totalPrice: z.number(),
        endDate: z.date(),
        inventory: z.number().default(1),
        paymentScreenshot: z.string(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Validate dates
      if (input.startDate > input.endDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "End date must be after start date",
        });
      }

      if (new Date(input.startDate).getDate() < new Date().getDate()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Start date cannot be in the past",
        });
      }

      const vehicle = await ctx.db
        .select({
          id: vehicles.id,
          inventory: vehicles.inventory,
          unavailabilityDates: vehicles.unavailabilityDates,
          basePrice: vehicles.basePrice,
          businessId: vehicles.businessId,
        })
        .from(vehicles)
        .where(eq(vehicles.id, input.vehicleId))
        .then((results) => results[0]);

      // Check if vehicle exists
      if (!vehicle) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Vehicle not found",
        });
      }

      // Check if requested number of vehicles is available
      if (input.inventory > vehicle.inventory) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Requested number of vehicles exceeds availability",
        });
      }

      // Generate array of dates between start and end date
      const getDatesInRange = (start: Date, end: Date) => {
        const dates: Date[] = [];
        const current = new Date(start);
        while (current <= end) {
          dates.push(new Date(current));
          current.setDate(current.getDate() + 1);
        }
        return dates;
      };

      const requestedDates = getDatesInRange(input.startDate, input.endDate);

      // Check if any requested dates conflict with unavailability dates
      const hasConflict = requestedDates.some((date) =>
        vehicle.unavailabilityDates.some(
          (unavailableDate) =>
            new Date(unavailableDate).toDateString() === date.toDateString(),
        ),
      );

      if (hasConflict) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Vehicle is not available for the selected dates",
        });
      }

      // Create rental record
      const rental = await ctx.db
        .insert(rentals)
        .values({
          businessId: vehicle.businessId,
          userId: ctx.session.user.id,
          vehicleId: input.vehicleId,
          rentalStart: input.startDate,
          rentalEnd: input.endDate,
          inventory: input.inventory,
          status: rentalStatusEnum.enumValues[0],
          totalPrice: input.totalPrice,
          notes: input.notes,
          paymentScreenshot: input.paymentScreenshot,
        })
        .returning();

      // Update vehicle unavailability dates
      await ctx.db
        .update(vehicles)
        .set({
          unavailabilityDates: [
            ...vehicle.unavailabilityDates,
            ...requestedDates,
          ],
          updatedAt: new Date(),
        })
        .where(eq(vehicles.id, input.vehicleId));

      return rental;
    }),
});
