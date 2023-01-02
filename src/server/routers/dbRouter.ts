import { router, publicProcedure, protectedProcedure } from '../trpc';
import { prisma } from '../db/client'
import { z } from 'zod';

export const dbRouter = router({
    getRace: publicProcedure
        .input(z.string)
        .query(async (input: any) => {
            const race = await prisma.race.findFirst({
                where: {
                    name: input
                }
            })
            return race;
        }),
    getAllRaces: publicProcedure
        .query(async () => {
            const races = await prisma?.race.findMany()
            return races
        }),
});