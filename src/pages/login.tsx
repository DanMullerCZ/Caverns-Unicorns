import {
  signIn,
  getCsrfToken,
  getProviders,
  SignInResponse,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import Image from 'next/image';
import VideoBackground from 'components/VideoBackground';

const Signin = () => {
  const router = useRouter();
  const [auth, setAuth] = useState({ email: '', password: '' });
  const emailInput = useRef<HTMLInputElement>(null)
  const handleChange = (ev: React.FormEvent<EventTarget>) => {
    const target: HTMLInputElement = ev.target as HTMLInputElement;
    setAuth({ ...auth, [target.name]: target.value });
  };

  return (
    <>
      <section>
        <VideoBackground/>
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="space-y-5 rounded-xl bg-white p-10 drop-shadow-lg">
            <h1 className="text-center text-3xl">Sign In</h1>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="email">
                Email
              </label>
              <input
                className="w-96 rounded-md border border-slate-400 px-3 py-2"
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
              />

              <label className="text-sm font-light" htmlFor="password">
                Password
              </label>
              <input
                className="w-96 rounded-md border border-slate-400 bg-[url('/img/hero-pattern.svg')] px-3 py-2"
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
              />
            </div>

            <p className="text-right">
              <a
                className="text-sm font-light text-blue-600 hover:underline"
                href="https://www.google.com"
              >
                Forget Password?
              </a>
            </p>
            <button
              className="w-full rounded-md bg-blue-600 px-10 py-2 text-white
            duration-300 ease-in hover:bg-blue-500 hover:drop-shadow-md"
              onClick={() => {
                signIn('credentials', { ...auth, redirect: false }).then(
                  (response) => {
                    if (response?.error) {
                      console.log(
                        'Credentials were wrong or Email wasnt verified', response
                      );
                    } else {
                      router.push(process.env.HOST || '/');
                    }
                  },
                );
              }}
            >
              Login with credentials
            </button>
            <div className="flex justify-around">
              <button
                className="bg-white-600 rounded-md border border-solid px-4 py-2 text-black
            duration-300 ease-in hover:bg-gray-100 hover:drop-shadow-md"
                onClick={() => {
                  signIn('discord', { callbackUrl: process.env.HOST });
                }}
              >
                Login with discord
              </button>
              <button
                className="bg-white-600 rounded-md border border-solid px-4 py-2 text-black
                duration-300 ease-in hover:bg-gray-100 hover:drop-shadow-md"
                onClick={() => {
                  signIn('discord', { callbackUrl: process.env.HOST });
                }}
              >
                Login with google
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signin;
