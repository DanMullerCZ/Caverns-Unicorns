"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playground = void 0;
const observable_1 = require("@trpc/server/observable");
//import { prisma } from '../prisma';
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const playground_1 = require("../playground/playground");
const pg = new playground_1.Playground();
exports.playground = (0, trpc_1.router)({
    sub: trpc_1.protectedProcedure.subscription(() => {
        console.log('subscribed');
        return (0, observable_1.observable)((emit) => {
            setInterval(() => {
                emit.next(pg.getState());
            }, 25);
        });
    }),
    remoteControl: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        up: zod_1.z.boolean(),
        left: zod_1.z.boolean(),
        down: zod_1.z.boolean(),
        right: zod_1.z.boolean(),
        orientation: zod_1.z.boolean()
    }))
        .mutation(async ({ input, ctx }) => {
        pg.setState({
            name: ctx.session.user.name,
            up: input.up,
            left: input.left,
            down: input.down,
            right: input.right,
            orientation: input.orientation,
        });
    }),
});
