import { observable } from '@trpc/server/observable';
//import { prisma } from '../prisma';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from 'server/trpc';
import { Subject, fromEvent } from 'rxjs';

const subject = new Subject<string>();
const chatMsg = new Subject<string>();
const online = new Subject<string>();


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

  sendMessage: protectedProcedure
    .input(z.object({ typing: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log('-----', input.typing);

      chatMsg.next(`${ctx.session.user.name}: ${input.typing}`);
    }),

  recieveMessage: protectedProcedure.subscription(() => {
    return observable<string>((emit) => {
      chatMsg.subscribe((x: string) => {
        emit.next(x);
      });
    });
  }),
  imOnline: protectedProcedure.mutation(async ({ ctx }) => {
    online.next(ctx.session.user.name as string);
  }),
  imOffline: protectedProcedure.mutation(async ({ ctx }) => {
    console.log(ctx.session.user.name + 'is offline');
  }),

  onlinePlayers: protectedProcedure.subscription(() => {
    return observable<string>((emit) => {
      online.subscribe((x: string) => {
        emit.next(x);
      });
    });
  }),
});
