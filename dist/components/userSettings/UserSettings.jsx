"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChangePasswordOption_1 = __importDefault(require("./ChangePasswordOption"));
const UserImage_1 = __importDefault(require("./UserImage"));
const UserSettings = () => {
    return (<>
            <ChangePasswordOption_1.default />
            <UserImage_1.default />
        </>);
};
exports.default = UserSettings;
