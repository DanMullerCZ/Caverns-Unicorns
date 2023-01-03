import { router, publicProcedure } from '../trpc';
import { wsRouter } from './subsciptions';
import { authRouter } from './auth';
import { exampleRouter } from './backend';
import { dbRouter } from './dbRouter';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  wsRouter: wsRouter,
  backend: exampleRouter,
  auth: authRouter,
  dbRouter: dbRouter,
});

export type AppRouter = typeof appRouter;
