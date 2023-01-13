"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const trpc_1 = require("../trpc");
exports.authRouter = (0, trpc_1.router)({
    getSession: trpc_1.publicProcedure.query(({ ctx }) => {
        return ctx.session;
    }),
    getSecretMessage: trpc_1.protectedProcedure.query(() => {
        return 'you can now see this secret message!';
    }),
});
