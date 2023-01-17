"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const react_1 = require("next-auth/react");
const trpc_1 = require("../utils/trpc");
const react_2 = require("react");
const VideoBackground_1 = __importDefault(require("components/VideoBackground"));
const NavigationBar_1 = __importDefault(require("components/NavigationBar"));
const Header_1 = __importDefault(require("components/general/Header"));
const Home = () => {
    return (<>
      <Header_1.default title='Home Page'/>
      <VideoBackground_1.default />
      <NavigationBar_1.default />
      <main className="goldeffect gold mx-auto flex flex-col items-center justify-center gap-10 px-6 py-8 font-LOTR md:h-screen">

        <h1 test-id='succes delete' className=" goldeffect gold text-[100px]">

          Welcome to Caverns & Unicorns

        </h1>
        <AuthShowcase />
      </main>
    </>);
};
exports.default = Home;
const AuthShowcase = () => {
    var _a;
    const { data: sessionData } = (0, react_1.useSession)();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [message, setMessage] = (0, react_2.useState)('This is the subscription field');
    trpc_1.trpc.wsRouter.sub.useSubscription(undefined, {
        onData(data) {
            setMessage(data);
        },
    });
    return (<div className="text-[40px]">
      <p>
        {sessionData && <span>Logged in as {(_a = sessionData.user) === null || _a === void 0 ? void 0 : _a.name}</span>}
      </p>

      <button className="goldeffect mr-12 " onClick={sessionData ? () => (0, react_1.signOut)() : () => (0, react_1.signIn)()}>
        {sessionData ? 'Log Out' : 'Log In'}
      </button>
      {!sessionData &&
            <link_1.default className="goldeffect" href={'/registration'}>
          Register
        </link_1.default>}

    </div>);
};
