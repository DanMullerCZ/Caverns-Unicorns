"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedProcedure = exports.publicProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const superjson_1 = __importDefault(require("superjson"));
const t = server_1.initTRPC.context().create({
    transformer: superjson_1.default,
    errorFormatter({ shape }) {
        return shape;
    },
});
exports.router = t.router;
/**
 * Unprotected procedure
 **/
exports.publicProcedure = t.procedure;
/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});
/**
 * Protected procedure
 **/
exports.protectedProcedure = t.procedure.use(isAuthed);
