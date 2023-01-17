"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
function DontHaveAccount() {
    return (<>
      <p className="text-center">
        {"Don't have an account yet?"}
        <link_1.default href="/registration">Register</link_1.default>
      </p>
    </>);
}
exports.default = DontHaveAccount;
