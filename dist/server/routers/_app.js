"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const subsciptions_1 = require("./subsciptions");
const auth_1 = require("./auth");
const backend_1 = require("./backend");
const dbRouter_1 = require("./dbRouter");
const userSettings_1 = require("./userSettings");
const playground_1 = require("./playground");
exports.appRouter = (0, trpc_1.router)({
    healthcheck: trpc_1.publicProcedure.query(() => 'yay!'),
    wsRouter: subsciptions_1.wsRouter,
    backend: backend_1.exampleRouter,
    auth: auth_1.authRouter,
    dbRouter: dbRouter_1.dbRouter,
    userSettings: userSettings_1.userSettRouter,
    playground: playground_1.playground,
});
