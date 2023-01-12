import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import VideoBackground from 'components/VideoBackground';
import Link from 'next/link';

const Signin = () => {
  const router = useRouter();
  const input = useRef<HTMLFormElement>(null);

  return (
    <>
      <section>
        <VideoBackground />
        <div className=" flex flex-col items-center justify-center  md:h-screen font-LOTR ">
        <div className='flex w-screen h-screen justify-center z-10 fixed items-center'>
        <div className='background '></div>
        </div>
          <div className="space-y-5 rounded-x p-10 drop-shadow-lg gold  goldnohover z-30">
            <h1 className="text-center text-3xl font-LOTR">Sign In</h1>
            <div test-id='login-error-response' className='text-red-600 text-center text-lg'>{router.asPath === '/login?error=true' && 'Error has occured. Check your credentials'}</div>
            
            <form ref={input} className="flex flex-col space-y-2">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                className="w-96 rounded-md border border-yellow-400 px-3 py-2 bg-transparent"
                type="email"
                name="email"
                id="email"
              />
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                className="w-96 rounded-md border border-yellow-400 px-3 py-2 bg-transparent"
                type="password"
                name="password"
                id="password"
              />
            </form>

            <p className="text-center goldeffect ">
              <a
                className="text-sm font-light "
                href="https://www.google.com"
              >
                Forgot Password?
              </a>
            </p>
            <button
              className="w-full rounded-md border border-yellow-400 px-10 py-2 goldeffect"
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
                      router.push(process.env.HOST || '/user');
                    }
                  });
                }
              }}
            >
              Login with Credentials
            </button>
            <div className="flex justify-around">
              <button
                className=" rounded-md border  border-yellow-400 px-4 py-2 goldeffect "
                onClick={() => {
                  signIn('discord', { callbackUrl: process.env.HOST });
                }}
              >
                Login with Discord
              </button>
              <button
                className=" rounded-md border  border-yellow-400 px-4 py-2 goldeffect "
                onClick={() => {
                  signIn('discord', { callbackUrl: process.env.HOST });
                }}
              >
                Login with Google
              </button>
            </div>
            <p className="text-center">
              {"Don't have an account yet?"}
              <Link href="http://localhost:3000/register">
                 Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
