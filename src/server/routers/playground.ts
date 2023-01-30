import { observable } from '@trpc/server/observable';
//import { prisma } from '../prisma';
import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';
import { Playground } from '../playground/playground';
import { NPC } from '../playground/npc';
import { Player } from '../playground/player';
import { Subject } from 'rxjs';

export let pg:Playground = new Playground();
const killedNpc = new Subject();

export const playground = router({
  sub: protectedProcedure.subscription(() => {
    console.log('subscribed');
    return observable<{
      [k: string]: {
        x: number;
        y: number;
        ownerId: string;
        orientation: boolean;
        status: { battle: boolean; alive: boolean };
      };
    }>((emit) => {
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
        orientation: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      pg.setState({
        id: ctx.session.user.id as string,
        up: input.up,
        left: input.left,
        down: input.down,
        right: input.right,
        orientation: input.orientation,
      });
    }),

  loadEnemies: publicProcedure.mutation(async () => {
    // await pg.fillWithNPCs()
    return pg.enemies.map((enemy) => {
      return {
        name: enemy.name,
        posX: enemy.coords.x,
        posY: enemy.coords.y,
        stats: enemy.getStats,
        img: enemy.image,
      };
    });
  }),

  somethingLikeBattle: protectedProcedure.mutation(async ({ ctx }) => {
    const { player } = pg.getOpponent(ctx.session.user.id as string);
    const hero = {
      // id: number,
      name: player?.name,
      // owner_id: string,
      maxHP: player?.hp,
      currentHP: player?.currentHP,
      str: player?.getStats.str,
      dex: player?.getStats.dex,
      con: player?.getStats.con,
      int: player?.getStats.int,
      wis: player?.getStats.wis,
      char: player?.char,
      class: player?.clas,
      race: player?.race,
    };
    const enemy = {
      id: player?.opponent?.id,
      name: player?.opponent?.name,
      posX: player?.opponent?.coords.x,
      posY: player?.opponent?.coords.y,
      img: player?.opponent?.image,
      dmg: player?.opponent?.getStats.dmg,
      power: player?.opponent?.getStats.pwr,
      cur_hp: player?.opponent?.currentHP,
      exp: player?.opponent?.getStats.exp,
      hp: player?.opponent?.hp,
    };
    console.warn('smthlbtprcdr', 'hero:', hero, 'enemy:', enemy);

    return { player: hero, npc: enemy };
  }),

  removeDeadNpc: protectedProcedure
    .input(z.object({ npcId: z.string() }))
    .mutation(({ input, ctx }) => {
      const killNpc = () => {
        killedNpc.next('kill');
      };
      pg.removeNpc(input.npcId, ctx.session.user.id, killNpc);

      return 'all goof';
    }),

  killNpc: protectedProcedure.subscription(() => {
    return observable<any>((emit) => {
      killedNpc.subscribe((x: any) => emit.next(x));
    });
  }),

  removeDeadPlayer: protectedProcedure
    .mutation(({ ctx }) => {
      console.log("///////////////");
      
      pg.removePlayer(ctx.session.user.id);
      return 'you died :(';
    }),

  retreat: protectedProcedure
    .input(z.object({ hero: z.any() }))
    .mutation(({ input }) => {
      pg.retreat(input.hero);
      return 'you retreated';
    }),
    newGame: protectedProcedure
    .input(z.array(z.number()))
    .mutation(({ input }) => {
      pg = new Playground(input)
      return 'you retreated';
    }),

  
});
