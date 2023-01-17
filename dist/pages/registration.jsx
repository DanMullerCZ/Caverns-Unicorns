"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = require("react");
const trpc_1 = require("../utils/trpc");
const VideoBackground_1 = __importDefault(require("../components/VideoBackground"));
const react_2 = __importDefault(require("react"));
const Register = () => {
    const creation = trpc_1.trpc.backend.registration.useMutation();
    const regForm = (0, react_1.useRef)(null);
    const submitForm = async () => {
        if (regForm.current) {
            const password = regForm.current[2];
            const confirmPassword = regForm.current[3];
            if (password.value == confirmPassword.value) {
                const email = regForm.current[0];
                const name = regForm.current[1];
                creation.mutate({
                    email: email.value,
                    password: password.value,
                    name: name.value,
                    match: true
                });
                console.log(regForm, 'has been sent');
            }
            else {
                const email = regForm.current[0];
                const name = regForm.current[1];
                creation.mutate({
                    email: email.value,
                    password: password.value,
                    name: name.value,
                    match: false,
                });
            }
        }
    };
    return (<>
      <VideoBackground_1.default />
      <head_1.default>
        <title>Register</title>
      </head_1.default>
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
            <input className=" w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2 " type="email" name="email" required/>
          </div>
          <div className="flex flex-col space-y-2">
            <label className=" bg-transparent text-sm font-light" htmlFor="name">
              Name:
            </label>
            <input className="w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2" type="text" name="name" required minLength={6} maxLength={25}/>
          </div>
          <div className="flex flex-col space-y-2">
            <label className=" bg-transparent text-sm font-light" htmlFor="password1">
              Password
            </label>
            <input className=" w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2" type="password" name="password1" required minLength={6} maxLength={25}/>
          </div>
          <div className=" flex flex-col space-y-2 bg-transparent">
            <label className="text-sm font-light" htmlFor="password1">
              Confirm password:
            </label>
            <input className=" w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2" type="password" name="password2" required minLength={6} maxLength={25}/>
          </div>
          <button className="border-yellow-400px-10 w-full rounded-md py-2 goldeffect " type="button" onClick={submitForm}>
            Submit
          </button>
        </form>
      </div>
    </>);
};
exports.default = Register;
