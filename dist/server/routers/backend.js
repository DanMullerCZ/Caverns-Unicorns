"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const jwt_1 = require("../../pages/api/auth/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_1 = require("./mail");
const client_1 = require(".././db/client");
exports.exampleRouter = (0, trpc_1.router)({
    addChar: trpc_1.publicProcedure
        .input(zod_1.z.object({
        class: zod_1.z.string(),
        race: zod_1.z.string(),
        user_id: zod_1.z.string(),
        name: zod_1.z.string(),
        str: zod_1.z.number(),
        con: zod_1.z.number(),
        dex: zod_1.z.number(),
        int: zod_1.z.number(),
        wis: zod_1.z.number(),
        char: zod_1.z.number(),
    }))
        .mutation(async (input) => {
        if (!input.input.name) {
            throw new Error('Name required.');
        }
        const check = await client_1.prisma.characters.findFirst({
            where: { name: input.input.name },
        });
        if (check) {
            throw new Error('Name already taken.');
        }
        const class_id = await client_1.prisma.class.findFirst({
            where: {
                name: input.input.class,
            },
            select: {
                id: true,
            },
        });
        const race_id = await client_1.prisma.race.findFirst({
            where: {
                name: input.input.race,
            },
            select: {
                id: true,
            },
        });
        if (!race_id)
            return 'Race not found.';
        if (!class_id)
            return 'Class not found.';
        await client_1.prisma.characters.create({
            data: {
                name: input.input.name,
                race: input.input.race,
                class: input.input.class,
                maxHP: input.input.con,
                currentHP: input.input.con,
                owner_id: input.input.user_id,
                str: input.input.str,
                dex: input.input.dex,
                con: input.input.con,
                int: input.input.int,
                wis: input.input.wis,
                char: input.input.char,
            },
        });
        return 'ok';
    }),
    races: trpc_1.publicProcedure
        .input(zod_1.z.object({ name: zod_1.z.string() }))
        .mutation(async (input) => {
        if (input.input.name.length == 0) {
            throw new Error('All fields are required.');
        }
        const check = await (client_1.prisma === null || client_1.prisma === void 0 ? void 0 : client_1.prisma.race.findFirst({
            where: { name: input.input.name.toLowerCase() },
        }));
        if (check) {
            throw new Error('Race already added.');
        }
        const res = await fetch(`https://www.dnd5eapi.co/api/races/${input.input.name.toLowerCase()}`).then((res) => res.json());
        if (!res.name) {
            throw new Error('Invalid race name.');
        }
        const response = {
            name: input.input.name.toLowerCase(),
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            char: 0,
            description: 'bla bla'
        };
        for (let i = 0; i < res.ability_bonuses.length; i++) {
            switch (res.ability_bonuses[i].ability_score.index) {
                case 'str': {
                    response.str = res.ability_bonuses[i].bonus;
                    break;
                }
                case 'dex': {
                    response.dex = res.ability_bonuses[i].bonus;
                    break;
                }
                case 'con': {
                    response.con = res.ability_bonuses[i].bonus;
                    break;
                }
                case 'int': {
                    response.int = res.ability_bonuses[i].bonus;
                    break;
                }
                case 'wis': {
                    response.wis = res.ability_bonuses[i].bonus;
                    break;
                }
                case 'char': {
                    response.char = res.ability_bonuses[i].bonus;
                    break;
                }
            }
        }
        await (client_1.prisma === null || client_1.prisma === void 0 ? void 0 : client_1.prisma.race.create({ data: response }));
        return response;
    }),
    registration: trpc_1.publicProcedure
        .input(zod_1.z.object({ email: zod_1.z.string(), password: zod_1.z.string(), name: zod_1.z.string(), match: zod_1.z.boolean() }))
        .mutation(async (input) => {
        try {
            if (!input.input.match) {
                return 'Passwords do not match';
            }
            const date = new Date();
            date.setDate(date.getSeconds() + 30);
            const user = (await (client_1.prisma === null || client_1.prisma === void 0 ? void 0 : client_1.prisma.user.create({
                data: {
                    email: input.input.email,
                    password: (0, jwt_1.hashToken)(input.input.password),
                    name: input.input.name,
                },
            })));
            const timeOfExpiration = new Date();
            const tokenExpiration = '1min'; // set also one line below
            timeOfExpiration.setMinutes(timeOfExpiration.getMinutes() + 1);
            const account = (await (client_1.prisma === null || client_1.prisma === void 0 ? void 0 : client_1.prisma.account.create({
                data: {
                    userId: user.id,
                    type: 'normal',
                    provider: 'Credentials',
                    verification_token: jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_ACCESS_SECRET, {
                        expiresIn: tokenExpiration,
                    }),
                },
            })));
            const session = (await (client_1.prisma === null || client_1.prisma === void 0 ? void 0 : client_1.prisma.session.create({
                data: { expires: date, userId: user.id, sessionToken: '-' },
            })));
            const message = `Token expires in ${tokenExpiration}, at  ${timeOfExpiration.toLocaleTimeString('Cs-cz')}
        ${(process.env.HOST +
                '/veryfiEmail?token=' +
                account.verification_token)}
        `;
            (0, mail_1.sendEmailVerificationToken)(user.email, 'Verify your account', message);
            if (session) {
                return 'Successfully registered';
            }
            else {
                return 'Internal error';
            }
        }
        catch (error) {
            return 'Name or email is already used';
        }
    }),
    veryfiEmail: trpc_1.publicProcedure
        .input(zod_1.z.object({ token: zod_1.z.string() }))
        .mutation(async ({ input }) => {
        const token = input.token;
        let account;
        let user;
        try {
            account = (await client_1.prisma.account.findMany({
                where: { verification_token: token },
            }));
            user = (await client_1.prisma.user.findUnique({
                where: { id: account[0].userId },
            }));
        }
        catch (error) {
            return { message: 'Invalid token' };
        }
        try {
            if (!(user === null || user === void 0 ? void 0 : user.emailVerified)) {
                jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
                await (client_1.prisma === null || client_1.prisma === void 0 ? void 0 : client_1.prisma.user.update({
                    where: { id: account[0].userId },
                    data: { emailVerified: new Date() },
                }));
                return { message: 'Email veryfied!' };
            }
            else {
                return { message: 'Email already verified' };
            }
        }
        catch (error) {
            if (!(user === null || user === void 0 ? void 0 : user.emailVerified)) {
                return {
                    message: 'Token has expired',
                };
            }
            else {
                return { message: 'Email already verified' };
            }
        }
    }),
    verifyEmailAgain: trpc_1.publicProcedure
        .input(zod_1.z.any())
        .mutation(async ({ input }) => {
        var _a, _b;
        const date = new Date();
        date.setDate(date.getSeconds() + 30);
        const timeOfExpiration = new Date();
        const tokenExpiration = '1min'; // set also one line below
        timeOfExpiration.setMinutes(timeOfExpiration.getMinutes() + 1);
        const account = await client_1.prisma.account.upsert({
            where: { userId: input.data.user.id
            },
            update: {
                verification_token: jsonwebtoken_1.default.sign({ email: input.data.user.email }, process.env.JWT_ACCESS_SECRET, {
                    expiresIn: tokenExpiration,
                }),
            },
            create: {
                userId: input.data.user.id,
                type: 'normal',
                provider: 'Credentials',
                providerAccountId: 'not important',
                verification_token: jsonwebtoken_1.default.sign({ email: input.data.user.email }, process.env.JWT_ACCESS_SECRET, {
                    expiresIn: tokenExpiration,
                }),
            },
        });
        const message = `Token expires in ${tokenExpiration}, at  ${timeOfExpiration.toLocaleTimeString('Cs-cz')}
        ${(process.env.HOST +
            '/veryfiEmail?token=' +
            account.verification_token)}
        `;
        (0, mail_1.sendEmailVerificationToken)((_b = (_a = input.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.email, 'Verify your account', message);
    })
});
