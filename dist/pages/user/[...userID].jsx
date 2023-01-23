"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Header_1 = __importDefault(require("components/general/Header"));
const NavigationBar_1 = __importDefault(require("components/NavigationBar"));
const UserSettings_1 = __importDefault(require("components/userSettings/UserSettings"));
const VideoBackground_1 = __importDefault(require("components/VideoBackground"));
const react_1 = require("next-auth/react");
const router_1 = require("next/router");
const react_2 = require("react");
const trpc_1 = require("utils/trpc");
function userPage() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
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
        if (session.status === 'unauthenticated') {
            router.push('/');
        }
    });
    const handleSendingMail = async () => {
        verification.mutate(session);
    };
    return (<>
      <Header_1.default title="User Page"/>
      <NavigationBar_1.default />
      <VideoBackground_1.default />

      <div className="flex h-screen flex-col items-center justify-center text-white">
        <div className="fixed z-10 flex h-screen w-screen items-center justify-center">
          <div className="backgroundSettings "></div>
        </div>
        <div className="flex flex-col items-center rounded-x gold font-LOTR goldnohover z-30 space-y-5  p-10 drop-shadow-lg">
          <h1 className="" test-id="succes login">USERS PAGE</h1>
          <UserSettings_1.default />
          <hr />
          <p>{(_b = (_a = session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.name}</p>
          {/* <p>{session.data?.user?.id}</p> */}
          <p>{(_d = (_c = session.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.email}</p>

          <hr />

          <p>
            {((_f = (_e = session.data) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.emailVerified)
            ? 'Email was succesfully verified'
            : 'Please, verify your email'}
          </p>
          <p>
            {((_h = (_g = session.data) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.premium)
            ? 'VIP was succesfully bought'
            : 'Buy premium membership'}
          </p>

          <hr />

          {/* <h2>URL Query as a string: {urlQuery.join('/')}</h2>

        <hr /> */}

          <button onClick={handleDelete}>DELETE USER</button>
          {/* <p>Response from deletion: {deletion.data?.toString()}</p> */}

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
        </div>
      </div>
    </>);
}
exports.default = userPage;
