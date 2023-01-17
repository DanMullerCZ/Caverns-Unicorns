"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSettRouter = void 0;
const trpc_1 = require("../trpc");
const client_1 = require("../db/client");
const zod_1 = require("zod");
const jwt_1 = require("pages/api/auth/jwt");
exports.userSettRouter = (0, trpc_1.router)({
    passwordCheck: trpc_1.publicProcedure
        .input(zod_1.z.object({
        currentPassword: zod_1.z.string(),
        newPassword: zod_1.z.string(),
        userId: zod_1.z.string(),
    }))
        .mutation(async ({ input }) => {
        try {
            const userPass = await client_1.prisma.user.findUnique({
                where: { id: input.userId },
                select: { password: true }
            });
            const hashedInput = (0, jwt_1.hashToken)(input.currentPassword);
            if (hashedInput === userPass.password) {
                const hashedNewPass = (0, jwt_1.hashToken)(input.newPassword);
                const newPassword = await client_1.prisma.user.update({
                    where: {
                        id: input.userId
                    },
                    data: {
                        password: hashedNewPass
                    }
                });
                return `Succesfully changed password`;
            }
            else {
                return `HASH> ${hashedInput} and ${userPass.password} `;
            }
        }
        catch (e) {
            return `Cannot acces data from database, error:${e}`;
        }
    })
});
