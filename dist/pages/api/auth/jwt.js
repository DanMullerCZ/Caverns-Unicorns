"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expiresAt = exports.hashToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const crypto = __importStar(require("crypto"));
dotenv.config({ path: __dirname + '/.env' });
// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(token) {
    return jsonwebtoken_1.default.sign({ userId: token.sub }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1m',
    });
}
// I choosed 8h because i prefer to make the user login again each day.
// But keep him logged in if he is using the app.
// You can change this value depending on your app logic.
// I would go for a maximum of 7 days, and make him login again after 7 days of inactivity.
function generateRefreshToken(token) {
    return jsonwebtoken_1.default.sign({
        userId: token.sub,
        jti: token.jti,
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '8h',
    });
}
function generateTokens(token) {
    const accessToken = generateAccessToken(token);
    const refreshToken = generateRefreshToken(token);
    return {
        accessToken,
        refreshToken,
    };
}
exports.generateTokens = generateTokens;
function hashToken(token) {
    return crypto.createHash('sha512').update(token).digest('hex');
}
exports.hashToken = hashToken;
const expiresAt = (token) => {
    const t = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
    return t.exp;
};
exports.expiresAt = expiresAt;
