"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const router_1 = require("next/router");
const react_2 = require("react");
const DontHaveAccount_1 = __importDefault(require("./DontHaveAccount"));
const ExternalLogin_1 = __importDefault(require("./ExternalLogin"));
const ForgotPassword_1 = __importDefault(require("./ForgotPassword"));
function LoginForm(props) {
    const router = (0, router_1.useRouter)();
    const input = (0, react_2.useRef)(null);
    const submitForm = () => {
        if (input.current) {
            const email = input.current.elements[0];
            const password = input.current.elements[1];
            (0, react_1.signIn)('credentials', {
                email: email.value,
                password: password.value,
                redirect: false,
            }).then((response) => {
                console.log(response);
                if ((response === null || response === void 0 ? void 0 : response.error) === 'CredentialsSignin' || (response === null || response === void 0 ? void 0 : response.error) === "Cannot read properties of null (reading 'password')" || (response === null || response === void 0 ? void 0 : response.error) === "Cannot read properties of null (reading 'email')") {
                    router.push('/login', { query: { error: 'true' } }); //
                }
                else {
                    router.push(process.env.HOST || '/user');
                }
            });
        }
    };
    return (<>
      <div className=" flex flex-col items-center justify-center  font-LOTR md:h-screen ">
        <div className="fixed z-10 flex h-screen w-screen items-center justify-center">
          <div className="background "></div>
        </div>
        <div className="rounded-x gold goldnohover z-30 space-y-5  p-10 drop-shadow-lg">
          <h1 className="text-center font-LOTR text-3xl">Sign In</h1>
          <div test-id="login-message" className="text-center text-lg text-red-600">
            {props.message && props.message}
          </div>
          <form ref={input} className="flex flex-col space-y-2">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input className="w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2" type="email" name="email" id="email"/>
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input className="w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2" type="password" name="password" id="password"/>
          </form>

          <button className="goldeffect w-full rounded-md border border-yellow-400 px-10 py-2" onClick={submitForm}>
            Login with Credentials
          </button>

          <div className="flex justify-around">
            <ExternalLogin_1.default provider="discord"/>
            <ExternalLogin_1.default provider="google"/>
          </div>

          <ForgotPassword_1.default />
          <DontHaveAccount_1.default />
        </div>
      </div>
    </>);
}
exports.default = LoginForm;
