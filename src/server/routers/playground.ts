import { observable } from '@trpc/server/observable';
//import { prisma } from '../prisma';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';
import { Playground } from '../playground/playground';

const pg = new Playground();

export const playground = router({
  sub: protectedProcedure.subscription(() => {
    console.log('subscribed');
    return observable<{ [k: string]: { x: number; y: number,orientation:boolean, distance: number } }>((emit) => {
      setInterval(() => {
        emit.next(pg.getState());
      }, 25);
    });
  }),

  remoteControl: protectedProcedure
    .input(
      z.object({
        up: z.boolean(),
        left: z.boolean(),
        down: z.boolean(),
        right: z.boolean(),
        orientation:z.boolean()
      }),
    )
    .mutation(async ({ input, ctx }) => {
      pg.setState({
        name: ctx.session.user.name as string,
        up: input.up,
        left: input.left,
        down: input.down,
        right: input.right,
        orientation: input.orientation,
      });
    }),

    loadEnemies: publicProcedure
      .mutation(async () => {
        await pg.fillWithNPCs()
        return pg.enemies.map((enemy) => {
          return {name: enemy.name, posX: enemy.coords.x, posY: enemy.coords.y}
        })
      })
});