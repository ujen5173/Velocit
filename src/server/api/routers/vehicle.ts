import { createTRPCRouter, publicProcedure } from "../trpc";

export const vehicleRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello world from vehicle router";
  }),
});
