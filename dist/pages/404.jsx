"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
function FourOhFour() {
    return <>
    <h1>404 - Page Not Found</h1>
    <link_1.default href="/" className="w-6 border border-solid border-black">
        BACK TO THE HOMEPAGE
    </link_1.default>
  </>;
}
exports.default = FourOhFour;
