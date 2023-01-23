"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const react_2 = require("react");
const trpc_1 = require("utils/trpc");
const ChangePasswordOption = () => {
    var _a, _b, _c;
    const passwordInput = (0, react_2.useRef)(null);
    const userPassword = trpc_1.trpc.userSettings.passwordCheck.useMutation();
    const [passwordStatus, setPasswordStatus] = (0, react_2.useState)('');
    const session = (0, react_1.useSession)();
    const currentPass = (_a = passwordInput.current) === null || _a === void 0 ? void 0 : _a.elements[0];
    const newPass = (_b = passwordInput.current) === null || _b === void 0 ? void 0 : _b.elements[1];
    const confirmNewPass = (_c = passwordInput.current) === null || _c === void 0 ? void 0 : _c.elements[2];
    const handleClick = (ev) => {
        var _a, _b;
        if (newPass.value === confirmNewPass.value &&
            currentPass.value.length &&
            confirmNewPass.value.length) {
            const currentPassword = {
                currentPassword: currentPass.value,
                newPassword: newPass.value,
                userId: (_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id,
            };
            ev.preventDefault();
            userPassword.mutate(currentPassword);
        }
        else {
            setPasswordStatus('invalid inputs');
        }
    };
    (0, react_2.useEffect)(() => {
        setPasswordStatus(userPassword.data);
    }, [userPassword.data]);
    return (<>
      <form ref={passwordInput} onSubmit={handleClick} className="flex flex-col">
        <div className="flex gap-1">
          <input className="rounded-md border bg-transparent px-3 py-2" type="text" placeholder="current password"/>
          <input className="rounded-md border bg-transparent px-3 py-2" type="text" placeholder="new password"/>
          <input className="rounded-md border bg-transparent px-3 py-2" type="text" placeholder=" confirm new password"/>
        </div>
        <p test-id="success">{passwordStatus}</p>
        <div className="self-center">
          <button type="submit">change password</button>
        </div>
      </form>
    </>);
};
exports.default = ChangePasswordOption;
