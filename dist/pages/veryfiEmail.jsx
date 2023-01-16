"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const trpc_1 = require("../utils/trpc");
const react_1 = require("react");
const VeryfiEmail = () => {
    var _a;
    const router = (0, router_1.useRouter)();
    const token = router.query.token;
    const veryfiEmail = trpc_1.trpc.backend.veryfiEmail.useMutation();
    (0, react_1.useEffect)(() => {
        veryfiEmail.mutate({ token: token });
    }, []);
    return (<div>
      <p>{(_a = veryfiEmail.data) === null || _a === void 0 ? void 0 : _a.message}</p>
      <p>Token: {token}</p>
    </div>);
};
exports.default = VeryfiEmail;
