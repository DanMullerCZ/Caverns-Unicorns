"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.formatErrors = void 0;
// @ts-check
const schema_mjs_1 = require("./schema.mjs");
const _clientEnv = schema_mjs_1.clientSchema.safeParse(schema_mjs_1.clientEnv);
const formatErrors = (
/** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
errors) => Object.entries(errors)
    .map(([name, value]) => {
    if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
})
    .filter(Boolean);
exports.formatErrors = formatErrors;
if (!_clientEnv.success) {
    console.error("❌ Invalid environment variables:\n", ...(0, exports.formatErrors)(_clientEnv.error.format()));
    throw new Error("Invalid environment variables");
}
for (let key of Object.keys(_clientEnv.data)) {
    if (!key.startsWith("NEXT_PUBLIC_")) {
        console.warn(`❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`);
        throw new Error("Invalid public environment variable name");
    }
}
exports.env = _clientEnv.data;
