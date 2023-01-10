import { type NextPage } from 'next';
import Head from 'next/head';
import { useRef, useState } from 'react';
import Link from 'next/link';

//import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from '../utils/trpc';
import VideoBackground from 'components/VideoBackground';

const Register: NextPage = () => {
  const creation = trpc.backend.registration.useMutation();
  const regForm = useRef<HTMLFormElement>(null);

  const submitForm = async () => {
    if (regForm.current) {
      const password = regForm.current[2] as HTMLInputElement;
      const confirmPassword = regForm.current[3] as HTMLInputElement;
      if (password.value == confirmPassword.value) {
        const email = regForm.current[0] as HTMLInputElement;
        const name = regForm.current[1] as HTMLInputElement;
        creation.mutate({
          email: email.value,
          password: password.value,
          name: name.value,
        });
        console.log(regForm, 'has been sent');
      } else {
        console.log('Passwords dont match');
      }
    }
  };

  return (
    <>
      <VideoBackground />
      <Head>
        <title>Register</title>
      </Head>
      <div className=" flex h-screen w-screen items-center ">
        <form
          ref={regForm}
          className=" gold goldeffect space-y-5 rounded-xl bg-transparent bg-white p-10 font-LOTR text-xl drop-shadow-lg "
        >
          <h1 className="text-center text-3xl">Registration</h1>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-light" htmlFor="email">
              Email:
            </label>
            <input
              className=" w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2 "
              type="email"
              name="email"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              className=" bg-transparent text-sm font-light"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2"
              type="text"
              name="name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              className=" bg-transparent text-sm font-light"
              htmlFor="password1"
            >
              Password
            </label>
            <input
              className=" w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2"
              type="password"
              name="password1"
            />
          </div>
          <div className=" flex flex-col space-y-2 bg-transparent">
            <label className="text-sm font-light" htmlFor="password1">
              Confirm password:
            </label>
            <input
              className=" w-96 rounded-md border border-yellow-400 bg-transparent px-3 py-2"
              type="password"
              name="password2"
            />
          </div>
          <button
            className="border-yellow-400px-10 w-full rounded-md py-2 text-white
            duration-300 ease-in hover:bg-blue-500 hover:drop-shadow-md"
            type="button"
            onClick={submitForm}
          >
            Submit
          </button>
          <p className="text-center text-gray-400">
            {"don't have an account yet?"}
            <Link href="http://www.google.com">
              <span className="text-blue-700"> Register</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
