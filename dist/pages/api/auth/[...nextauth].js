"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const next_auth_1 = __importDefault(require("next-auth"));
const discord_1 = __importDefault(require("next-auth/providers/discord"));
// Prisma adapter for NextAuth, optional and can be removed
const prisma_adapter_1 = require("@next-auth/prisma-adapter");
const server_1 = require("../../../env/server");
const client_1 = require("../../../server/db/client");
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const jwt_1 = require("./jwt");
const crypto_1 = require("crypto");
exports.authOptions = {
    // Include user.id on session
    pages: {
        signIn: '/login',
    },
    // Configure one or more authentication providers
    adapter: (0, prisma_adapter_1.PrismaAdapter)(client_1.prisma),
    providers: [
        (0, discord_1.default)({
            clientId: server_1.env.DISCORD_CLIENT_ID,
            clientSecret: server_1.env.DISCORD_CLIENT_SECRET,
        }),
        (0, credentials_1.default)({
            //type: "credentials",
            //id: "domain-login",
            name: 'Credentials',
            async authorize(credentials) {
                const payload = {
                    email: credentials === null || credentials === void 0 ? void 0 : credentials.email,
                    password: credentials === null || credentials === void 0 ? void 0 : credentials.password,
                };
                const user = (await client_1.prisma.user.findUnique({
                    where: { email: payload.email },
                }));
                if (user.password == (0, jwt_1.hashToken)(payload.password)) {
                    return user;
                }
                else {
                    return null;
                }
            },
            credentials: {
                email: { label: 'E-mail', type: 'text ' },
                password: { label: 'Password', type: 'password' },
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                console.log(token);
                const st = () => {
                    var _a;
                    return (_a = crypto_1.randomUUID === null || crypto_1.randomUUID === void 0 ? void 0 : (0, crypto_1.randomUUID)()) !== null && _a !== void 0 ? _a : (0, crypto_1.randomBytes)(32).toString('hex');
                };
                session.user.id = token.sub;
                const verif = await client_1.prisma.user.findUnique({
                    where: {
                        id: session.user.id
                    },
                    select: {
                        emailVerified: true
                    }
                });
                session.user.emailVerified = (verif === null || verif === void 0 ? void 0 : verif.emailVerified) ? true : false;
                const s = await client_1.prisma.session.updateMany({
                    where: { userId: token.sub },
                    data: {
                        sessionToken: st(),
                        expires: new Date(Number(token.exp) * 1000),
                    },
                });
                const tokens = (0, jwt_1.generateTokens)(token);
                const a = await client_1.prisma.account.updateMany({
                    where: { userId: token.sub },
                    data: {
                        access_token: tokens.accessToken,
                        refresh_token: tokens.refreshToken,
                        expires_at: (0, jwt_1.expiresAt)(tokens.accessToken),
                        id_token: token.jti,
                    },
                });
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        // Set to jwt in order to CredentialsProvider works properly
        strategy: 'jwt',
    },
};
exports.default = (0, next_auth_1.default)(exports.authOptions);
