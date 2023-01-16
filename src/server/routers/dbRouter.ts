import { router, publicProcedure } from '../trpc';
import { prisma } from '../db/client'
import { z } from 'zod';

export const dbRouter = router({
    getCharacters:publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            const characters = await prisma.characters.findMany({
                where: {
                    owner_id: input
                }
            })
            return characters;
        }),
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
        getUserById: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            try {
                const foundUser = await prisma.user.findUnique({
                    where: {
                        id: input,
                    }
                })
                return foundUser
            } catch (error: any) {
                return `No user with id ${input} was found`
            }
        }),
    deleteUser: publicProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            try {
                const deletedUser = await prisma.user.delete({
                    where: {
                        id: input
                    }
                })
                return deletedUser 
            } catch (error: any) {
                return `Unable to delete user with id ${input}`
            }
        }),
    createPremium: publicProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            try {
                const newPremium = await prisma.premium_Membership.create({
                    data: {
                        userId: input,
                        paidDate: new Date(),
                        status: 'active',
                    }
                })
                return newPremium
            } catch (error) {
                return 'error has occured'
            }
        }),
});