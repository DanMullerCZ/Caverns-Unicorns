import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import VideoBackground from 'components/VideoBackground';
import Link from 'next/link';

const Signin = () => {
  const router = useRouter();
  const input = useRef<HTMLFormElement>(null);

  return (
    <>
      <section>
        <VideoBackground />
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="space-y-5 rounded-xl bg-white p-10 drop-shadow-lg">
            <h1 className="text-center text-3xl">Sign In</h1>
            <div test-id='login-error-response' className='text-red-600 text-center text-lg'>{router.asPath === '/login?error=true' && 'Error has occured. Check your credentials'}</div>
            <form ref={input} className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="email">
                Email
              </label>
              <input
                className="w-96 rounded-md border border-slate-400 px-3 py-2"
                type="email"
                name="email"
                id="email"
              />
              <label className="text-sm font-light" htmlFor="password">
                Password
              </label>
              <input
                className="w-96 rounded-md border border-slate-400 bg-[url('/img/hero-pattern.svg')] px-3 py-2"
                type="password"
                name="password"
                id="password"
              />
            </form>

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
                if (input.current) {
                  const email = input.current.elements[0] as HTMLInputElement;
                  const password = input.current
                    .elements[1] as HTMLInputElement;
                  signIn('credentials', {
                    email: email.value,
                    password: password.value,
                    redirect: false,
                  }).then((response) => {
                    if (response?.error) {
                      router.push('/login', { query: { error: 'true' } } )
                    } else {
                      router.push(process.env.HOST || '/character-list');
                    }
                  });
                }
              }}
            >
              Login with Credentials
            </button>
            <div className="flex justify-around">
              <button
                className="bg-white-600 rounded-md border border-solid px-4 py-2 text-black
            duration-300 ease-in hover:bg-gray-100 hover:drop-shadow-md"
                onClick={() => {
                  signIn('discord', { callbackUrl: process.env.HOST });
                }}
              >
                Login with Discord
              </button>
              <button
                className="bg-white-600 rounded-md border border-solid px-4 py-2 text-black
                duration-300 ease-in hover:bg-gray-100 hover:drop-shadow-md"
                onClick={() => {
                  signIn('discord', { callbackUrl: process.env.HOST });
                }}
              >
                Login with Google
              </button>
            </div>
            <p className="text-center text-gray-400">
              {"Don't have an account yet?"}
              <Link href="http://localhost:3000/register">
                <span className="text-blue-700"> Register</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
