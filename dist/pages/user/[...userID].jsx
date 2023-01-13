"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const router_1 = require("next/router");
const react_2 = require("react");
const trpc_1 = require("utils/trpc");
function userPage() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const session = (0, react_1.useSession)();
    const router = (0, router_1.useRouter)();
    const urlQuery = router.query.userID || [];
    const deletion = trpc_1.trpc.dbRouter.deleteUser.useMutation();
    const verification = trpc_1.trpc.backend.verifyEmailAgain.useMutation();
    const handleDelete = () => {
        var _a, _b;
        deletion.mutate((_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id);
        (0, react_1.signOut)();
    };
    (0, react_2.useEffect)(() => {
        if (session.status === "unauthenticated") {
            router.push('/');
        }
    });
    const handleSendingMail = async () => {
        verification.mutate(session);
    };
    return <>
        <h1>Here is your user page</h1>
        <hr />
        <p>{(_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.name}</p>
        <p>{(_d = (_c = session.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id}</p>
        <p>{(_f = (_e = session.data) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.email}</p>

        <hr />

        <p>{((_h = (_g = session.data) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.emailVerified) ? 'Email was succesfully verified' : 'You have to verify your email'}</p>

        <hr />

        <h2>URL Query as a string: {urlQuery.join('/')}</h2>

        <hr />

        <button onClick={handleDelete}>
            DELETE USER
        </button>
        <p>Response from deletion: {(_j = deletion.data) === null || _j === void 0 ? void 0 : _j.toString()}</p>

        <hr />

        <button onClick={() => {
            (0, react_1.signOut)();
            router.push('/');
        }}>
            LOG OUT
        </button>

        <hr />

        <button onClick={handleSendingMail}>
            Send verification email once more
        </button>
    </>;
}
exports.default = userPage;
