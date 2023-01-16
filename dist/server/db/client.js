"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const server_1 = require("../../env/server");
exports.prisma = global.prisma ||
    new client_1.PrismaClient({
        log: server_1.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
if (server_1.env.NODE_ENV !== 'production') {
    global.prisma = exports.prisma;
}
