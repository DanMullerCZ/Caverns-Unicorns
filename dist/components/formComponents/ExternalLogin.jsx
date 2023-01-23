"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
function ExternalLogin(props) {
    return (<>
      <button className=" goldeffect rounded-md  border border-yellow-400 px-4 py-2 " onClick={() => {
            (0, react_1.signIn)(props.provider, { callbackUrl: '/' });
        }}>
        Login with {props.provider}
      </button>
    </>);
}
exports.default = ExternalLogin;
