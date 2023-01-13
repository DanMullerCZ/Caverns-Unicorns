"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_1 = require("react");
const trpc_1 = require("utils/trpc");
const ChangePasswordOption = () => {
    const router = (0, router_1.useRouter)();
    const passwordInput = (0, react_1.useRef)(null);
    const userPassword = trpc_1.trpc.userSettings.changePassword.useMutation();
    const handleClick = () => {
        userPassword.mutate(passwordInput.current.value);
    };
    return (<>
            <input ref={passwordInput} type="text"/>
            <div>{userPassword.data ? 'correct pasword' : 'wrong password'}</div>
            <button onClick={handleClick}>change password</button>
        </>);
};
exports.default = ChangePasswordOption;
