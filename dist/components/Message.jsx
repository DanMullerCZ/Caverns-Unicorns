"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
function Message(props) {
    return (<>
        <div className="m-auto">
            <h1>Message you</h1>
            <p>{props.text}</p>
            <link_1.default href='/'>Homepage</link_1.default>
            <link_1.default href='/login'>Login</link_1.default>
        </div>
    </>);
}
exports.default = Message;
