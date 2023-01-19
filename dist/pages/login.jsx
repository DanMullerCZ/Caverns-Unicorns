"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_1 = require("react");
const VideoBackground_1 = __importDefault(require("components/VideoBackground"));
const NavigationBar_1 = require("components/NavigationBar");
const LoginForm_1 = __importDefault(require("components/formComponents/LoginForm"));
const Header_1 = __importDefault(require("components/general/Header"));
const Signin = () => {
    const router = (0, router_1.useRouter)();
    // const input = useRef<HTMLFormElement>(null);
    const [message, setMessage] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (router.asPath === '/login?error=true') {
            setMessage('Wrong email or password');
        }
        else if (router.asPath === '/login#registered') {
            setMessage('Successfully registered. Now you can login');
        }
        else {
            setMessage('');
        }
    }, [router]);
    return (<>
      <section>
        <Header_1.default title='Login'/>
        <NavigationBar_1.NavigationBar />
        <VideoBackground_1.default />
        <LoginForm_1.default message={message}/>
      </section>
    </>);
};
exports.default = Signin;
