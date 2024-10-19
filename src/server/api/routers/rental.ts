import { createTRPCRouter, publicProcedure } from "../trpc";

export const rentalRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello world from Rental router";
  }),
});
