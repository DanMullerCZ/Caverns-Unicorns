"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const react_2 = require("react");
const swr_1 = __importDefault(require("swr"));
const trpc_1 = require("utils/trpc");
function Result() {
    const router = (0, router_1.useRouter)();
    const session = (0, react_1.useSession)();
    const premium = trpc_1.trpc.dbRouter.createPremium.useMutation();
    // using swr because I cannot have default function asynchronous
    const { data, error } = (0, swr_1.default)(router.query.session_id
        ? `api/stripe/checkout/${router.query.session_id}`
        : null, (url) => fetch(url).then(res => res.json()));
    (0, react_2.useEffect)(() => {
        var _a, _b, _c, _d;
        if ((data === null || data === void 0 ? void 0 : data.session.status) === 'complete' && ((_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id)) {
            premium.mutate((_d = (_c = session.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return (<>
        <h1>Payment Result</h1>
        <pre>{data ? data.session.status : 'Loading...'}</pre>
        <link_1.default href='/user'>
            Go to your user page
        </link_1.default>
    </>);
}
exports.default = Result;
