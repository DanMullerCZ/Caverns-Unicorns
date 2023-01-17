"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRouter = void 0;
const trpc_1 = require("../trpc");
const client_1 = require("../db/client");
const zod_1 = require("zod");
exports.dbRouter = (0, trpc_1.router)({
    getCharacters: trpc_1.publicProcedure
        .input(zod_1.z.string())
        .query(async ({ input }) => {
        const characters = await client_1.prisma.characters.findMany({
            where: {
                owner_id: input
            }
        });
        return characters;
    }),
    getRace: trpc_1.publicProcedure
        .input(zod_1.z.string())
        .query(async ({ input }) => {
        const race = await client_1.prisma.race.findFirst({
            where: {
                name: input
            }
        });
        return race;
    }),
    getAllRaces: trpc_1.publicProcedure
        .query(async () => {
        const races = await (client_1.prisma === null || client_1.prisma === void 0 ? void 0 : client_1.prisma.race.findMany());
        return races;
    }),
    getClass: trpc_1.publicProcedure
        .input(zod_1.z.string())
        .query(async ({ input }) => {
        const classDetail = await client_1.prisma.class.findFirst({
            where: {
                name: input
            }
        });
        return classDetail;
    }),
    getAllClasses: trpc_1.publicProcedure
        .query(async () => {
        const classes = await (client_1.prisma === null || client_1.prisma === void 0 ? void 0 : client_1.prisma.class.findMany());
        return classes;
    }),
    getUserById: trpc_1.publicProcedure
        .input(zod_1.z.string())
        .query(async ({ input }) => {
        try {
            const foundUser = await client_1.prisma.user.findUnique({
                where: {
                    id: input,
                }
            });
            return foundUser;
        }
        catch (error) {
            return `No user with id ${input} was found`;
        }
    }),
    deleteUser: trpc_1.publicProcedure
        .input(zod_1.z.string())
        .mutation(async ({ input }) => {
        try {
            const deletedUser = await client_1.prisma.user.delete({
                where: {
                    id: input
                }
            });
            return deletedUser;
        }
        catch (error) {
            return `Unable to delete user with id ${input}`;
        }
    }),
    createPremium: trpc_1.publicProcedure
        .input(zod_1.z.string())
        .mutation(async ({ input }) => {
        try {
            const newPremium = await client_1.prisma.premium_Membership.create({
                data: {
                    userId: input,
                    paidDate: new Date(),
                    status: 'active',
                }
            });
            return newPremium;
        }
        catch (error) {
            return 'error has occured';
        }
    }),
});
