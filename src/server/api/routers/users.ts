import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  current: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session.user;
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string().email().optional(),
        name: z.string().min(2).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedUser = await ctx.db
          .update(users)
          .set(input)
          .where(eq(users.id, ctx.session.user.id))
          .returning();

        return updatedUser[0];
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

  delete: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db
      .update(users)
      .set({
        deleted: true,
      })
      .where(eq(users.id, ctx.session.user.id));
    return true;
  }),

  changeRole: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        role: z.enum(["USER", "VENDOR"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({ role: input.role })
        .where(eq(users.id, input.id ?? ctx.session.user.id));
      return true;
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(users).where(eq(users.id, input.id));
    }),
});
