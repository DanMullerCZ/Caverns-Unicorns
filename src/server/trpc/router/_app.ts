import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./backend";

export const appRouter = router({
  backend: exampleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
