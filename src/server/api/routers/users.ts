import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello world from User router";
  }),
});
