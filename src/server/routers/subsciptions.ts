import { observable } from '@trpc/server/observable';
//import { prisma } from '../prisma';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from 'server/trpc';
import { Subject } from 'rxjs';

const subject = new Subject<string>();

export const wsRouter = router({
  sub: protectedProcedure.subscription(() => {
    console.log('subscribed');
    return observable<string>((emit) => {
      subject.subscribe((x: string) => {
        emit.next(x);
      });
    });
  }),

  input: protectedProcedure
    .input(z.object({ typing: z.string() }))
    .mutation(async ({ input, ctx }) => {
      //console.log('ctx:', ctx);
      console.log(input.typing);
      subject.next(input.typing);
    }),
});
