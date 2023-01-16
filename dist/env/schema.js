"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientEnv = exports.clientSchema = exports.serverSchema = void 0;
// @ts-check
const zod_1 = require("zod");
/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
exports.serverSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().url(),
    NODE_ENV: zod_1.z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET: process.env.NODE_ENV === "production"
        ? zod_1.z.string().min(1)
        : zod_1.z.string().min(1).optional(),
    NEXTAUTH_URL: zod_1.z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => { var _a; return (_a = process.env.VERCEL_URL) !== null && _a !== void 0 ? _a : str; }, 
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? zod_1.z.string() : zod_1.z.string().url()),
    DISCORD_CLIENT_ID: zod_1.z.string(),
    DISCORD_CLIENT_SECRET: zod_1.z.string(),
});
/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
exports.clientSchema = zod_1.z.object({
// NEXT_PUBLIC_BAR: z.string(),
});
/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
exports.clientEnv = {
// NEXT_PUBLIC_BAR: process.env.NEXT_PUBLIC_BAR,
};
