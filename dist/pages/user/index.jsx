"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const withoutUserID = () => {
    var _a, _b, _c;
    const session = (0, react_1.useSession)();
    const router = (0, router_1.useRouter)();
    if (session.status === 'authenticated') {
        router.push(`/user/${(_a = session.data.user) === null || _a === void 0 ? void 0 : _a.id}`);
    }
    return <>
        <p>{(_c = (_b = session.data) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.name}</p>
        <h1>You need to be logged in</h1>
        <link_1.default href="/login" className="w-6 border border-solid border-black">
            LOG IN
        </link_1.default>
    </>;
};
exports.default = withoutUserID;
