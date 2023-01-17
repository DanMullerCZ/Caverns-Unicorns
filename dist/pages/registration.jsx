"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const trpc_1 = require("../utils/trpc");
const VideoBackground_1 = __importDefault(require("../components/VideoBackground"));
const react_2 = __importDefault(require("react"));
const router_1 = require("next/router");
const NavigationBar_1 = require("components/NavigationBar");
const Header_1 = __importDefault(require("components/general/Header"));
const Register = () => {
    const router = (0, router_1.useRouter)();
    const creation = trpc_1.trpc.backend.registration.useMutation();
    const regForm = (0, react_1.useRef)(null);
    const submitForm = async () => {
        if (regForm.current) {
            const email = regForm.current[0];
            const name = regForm.current[1];
            const password = regForm.current[2];
            const confirmPassword = regForm.current[3];
            if (password.checkValidity() && confirmPassword.checkValidity() && name.checkValidity() && email.checkValidity()) {
                if (password.value == confirmPassword.value) {
                    creation.mutate({
                        email: email.value,
                        password: password.value,
                        name: name.value,
                        match: true
                    });
                }
                else {
                    creation.mutate({
                        email: email.value,
                        password: password.value,
                        name: name.value,
                        match: false,
                    });
                }
            }
            else {
                alert('All inputs are required and must have between 4-30 characters and email must be valid');
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (creation.data === 'Successfully registered') {
            router.push('/login#registered');
        }
    }, [creation.data, router]);
    return (<>
      <VideoBackground_1.default />
      <NavigationBar_1.NavigationBar />
      <Header_1.default title='Registration'/>
      <div className='flex w-screen h-screen justify-center z-10 fixed items-center'>
        <div className='background '></div>
      </div>
      <div className=" flex h-screen w-screen items-center justify-center z-30 absolute">
        <form ref={regForm} className=" gold goldnohover space-y-5 rounded-xl bg-transparent bg-white p-10 font-LOTR text-xl drop-shadow-lg ">
          <h1 className="text-center text-3xl">Registration</h1>
          <div className="flex flex-col space-y-2">
            <div test-id="registration-error-response" className="text-red-600 text-center text-lg">
              {creation.data}
            </div>
            <label className="text-sm font-light" htmlFor="email">
              Email:
            </label>
            <input className=" w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2 " type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
          </div>
          <div className="flex flex-col space-y-2">
            <label className=" bg-transparent text-sm font-light" htmlFor="name">
              Name:
            </label>
            <input className="w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2" type="text" name="name" minLength={4} maxLength={30}/>
          </div>
          <div className="flex flex-col space-y-2">
            <label className=" bg-transparent text-sm font-light" htmlFor="password1">
              Password
            </label>
            <input className=" w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2" type="password" name="password1" minLength={4} maxLength={30}/>
          </div>
          <div className=" flex flex-col space-y-2 bg-transparent">
            <label className="text-sm font-light" htmlFor="password1">
              Confirm password:
            </label>
            <input className=" w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2" type="password" name="password2" minLength={4} maxLength={30}/>
          </div>
          <button className="border-yellow-400px-10 w-full rounded-md py-2 goldeffect " type="button" onClick={submitForm}>
            Submit
          </button>
        </form>
      </div>
    </>);
};
exports.default = Register;
