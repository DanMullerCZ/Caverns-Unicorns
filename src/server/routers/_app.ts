import { router, publicProcedure } from '../trpc';
import { wsRouter } from './subsciptions';
import { authRouter } from './auth';
import { exampleRouter } from './backend';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  wsRouter: wsRouter,
  backend: exampleRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
