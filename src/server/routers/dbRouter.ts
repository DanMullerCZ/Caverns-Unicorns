import { router, publicProcedure } from '../trpc';
import { prisma } from '../db/client'
import { z } from 'zod';

export const dbRouter = router({
    getRace: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
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
    getClass: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            const classDetail = await prisma.class.findFirst({
                where: {
                    name: input
                }
            })
            return classDetail;
        }),
    getAllClasses: publicProcedure
        .query(async () => {
            const classes = await prisma?.class.findMany()
            return classes
        }),
});