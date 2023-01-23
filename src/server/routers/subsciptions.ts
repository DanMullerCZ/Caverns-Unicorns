import { observable } from '@trpc/server/observable';
import { prisma } from '../db/client';
import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { Subject } from 'rxjs';

const subject = new Subject<string>();
const chatMsg = new Subject<string>();
const online = new Subject<string>();
const onlineChars = new Subject<any>();

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
    .mutation(async ({ input }) => {
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

  onlinePlayers: protectedProcedure.subscription(() => {
    return observable<string>((emit) => {
      online.subscribe((x: string) => {
        emit.next(x);
      });
    });
  }),
  onlinePlayersWithChars:protectedProcedure
  .input(z.object({char_id:z.number()}))
  .mutation(async({input,ctx})=>{
     const result = await prisma.characters.findFirst({where:{id:input.char_id,owner_id:ctx.session.user.id}})
    onlineChars.next({char_id:input.char_id,name:ctx.session.user.name,hero_name:result?.name,class:result?.class,race:result?.race})
  }),
  onlinePlayersAfterLogin:protectedProcedure.subscription(()=>{
    return observable<any>((emit) => {
      onlineChars.subscribe((x:any) => {
        emit.next(x);
      });
  })
  
}),
inGameRecieveMessage: protectedProcedure.subscription(() => {
    return observable<string>((emit) => {
      chatMsg.subscribe((x: string) => {
        emit.next(x);
      });
    });
  }),
  inGameSendMessage: protectedProcedure
    .input(z.object({ typing: z.string() }))
    .mutation(async ({ input, ctx }) => {
     chatMsg.next(`${ctx.session.user.name}: ${input.typing}`);
    }),
}

)
