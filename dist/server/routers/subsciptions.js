"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsRouter = void 0;
const observable_1 = require("@trpc/server/observable");
//import { prisma } from '../prisma';
const zod_1 = require("zod");
const trpc_1 = require("server/trpc");
const rxjs_1 = require("rxjs");
const subject = new rxjs_1.Subject();
const chatMsg = new rxjs_1.Subject();
const online = new rxjs_1.Subject();
exports.wsRouter = (0, trpc_1.router)({
    sub: trpc_1.protectedProcedure.subscription(() => {
        console.log('subscribed');
        return (0, observable_1.observable)((emit) => {
            subject.subscribe((x) => {
                emit.next(x);
            });
        });
    }),
    input: trpc_1.protectedProcedure
        .input(zod_1.z.object({ typing: zod_1.z.string() }))
        .mutation(async ({ input, ctx }) => {
        //console.log('ctx:', ctx);
        console.log(input.typing);
        subject.next(input.typing);
    }),
    sendMessage: trpc_1.protectedProcedure
        .input(zod_1.z.object({ typing: zod_1.z.string() }))
        .mutation(async ({ input, ctx }) => {
        console.log('-----', input.typing);
        chatMsg.next(`${ctx.session.user.name}: ${input.typing}`);
    }),
    recieveMessage: trpc_1.protectedProcedure.subscription(() => {
        return (0, observable_1.observable)((emit) => {
            chatMsg.subscribe((x) => {
                emit.next(x);
            });
        });
    }),
    imOnline: trpc_1.protectedProcedure.mutation(async ({ ctx }) => {
        online.next(ctx.session.user.name);
    }),
    onlinePlayers: trpc_1.protectedProcedure.subscription(() => {
        return (0, observable_1.observable)((emit) => {
            online.subscribe((x) => {
                emit.next(x);
            });
        });
    }),
});
