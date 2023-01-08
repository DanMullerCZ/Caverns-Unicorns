import { type NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';

//import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from '../utils/trpc';
import VideoBackground from 'components/VideoBackground';

const Register: NextPage = () => {
  const creation = trpc.backend.registration.useMutation();
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: '',
    name: '',
  });
  const handleChange = (ev: React.FormEvent<EventTarget>) => {
    const target: HTMLInputElement = ev.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };
  const submitForm = async () => {
    console.log(formData.password1, '--', formData.password2);

    if (formData.password1 == formData.password2) {
      creation.mutate({
        email: formData.email,
        password: formData.password1,
        name: formData.name,
      });
      console.log(formData, 'has been sent');
    } else {
      console.log('Passwords dont match');
    }
  };

  return (
    <>
      <VideoBackground/>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center">
        
        <form className="space-y-5 rounded-xl bg-white p-10 drop-shadow-lg">
          <h1 className="text-center text-3xl">Registration</h1>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-light" htmlFor="email">
              Email:
            </label>
            <input
              className="w-96 rounded-md border border-slate-400 px-3 py-2"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-light" htmlFor="name">
              Name:
            </label>
            <input
              className="w-96 rounded-md border border-slate-400 px-3 py-2"
              type="text"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-light" htmlFor="password1">
              Password
            </label>
            <input
              className="w-96 rounded-md border border-slate-400 px-3 py-2"
              type="password"
              name="password1"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-light" htmlFor="password1">
              Confirm password:
            </label>
            <input
              className="w-96 rounded-md border border-slate-400 px-3 py-2"
              type="password"
              name="password2"
              onChange={handleChange}
            />
          </div>
          <button
            className="w-full rounded-md bg-blue-600 px-10 py-2 text-white
            duration-300 ease-in hover:bg-blue-500 hover:drop-shadow-md"
            type="button"
            onClick={submitForm}
          >
            Submit
          </button>
          <p className="text-center text-gray-400">
            don't have an account yet?
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
