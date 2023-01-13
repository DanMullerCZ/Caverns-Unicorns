"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSettRouter = void 0;
const trpc_1 = require("../trpc");
const client_1 = require("../db/client");
const zod_1 = require("zod");
const jwt_1 = require("pages/api/auth/jwt");
exports.userSettRouter = (0, trpc_1.router)({
    changePassword: trpc_1.publicProcedure
        .input(zod_1.z.string())
        .mutation(async ({ input, ctx }) => {
        var _a, _b;
        let correctPassword = null;
        if (input === '') {
            throw new Error('please provide new password');
        }
        const userPass = await client_1.prisma.user.findUnique({
            where: { id: (_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id },
            select: { password: true }
        });
        const hashedInput = (0, jwt_1.hashToken)(input);
        hashedInput === userPass.password ? correctPassword = true : correctPassword = false;
        return correctPassword;
    })
});
