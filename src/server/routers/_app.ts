import { router, publicProcedure } from '../trpc';
import { wsRouter } from './subsciptions';
import { authRouter } from './auth';
import { exampleRouter } from './backend';
import { dbRouter } from './dbRouter';
import { playground } from './playground';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  wsRouter: wsRouter,
  backend: exampleRouter,
  auth: authRouter,
  dbRouter: dbRouter,
  playground: playground,
});

export type AppRouter = typeof appRouter;
