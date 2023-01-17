"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
function Header(props) {
    return (<>
      <head_1.default>
        <meta name="description" content="Caverns & Unicorns"/>
        <meta charSet="UTF-8"/>
        <link rel="icon" href="/favicon.ico"/>
        <title>{props.title}</title>
      </head_1.default>
    </>);
}
exports.default = Header;
