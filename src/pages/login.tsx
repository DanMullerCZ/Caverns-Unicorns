import {
  signIn,
  getCsrfToken,
  getProviders,
  SignInResponse,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { fromEvent } from 'rxjs';

const Signin = () => {
  const router = useRouter();
  const [auth, setAuth] = useState({ email: '', password: '' });
  const handleChange = (ev: React.FormEvent<EventTarget>) => {
    const target: HTMLInputElement = ev.target as HTMLInputElement;
    setAuth({ ...auth, [target.name]: target.value });
  };
  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input onChange={handleChange} type="email" name="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
        />
        <br />
        <button
          onClick={() => {
            signIn('credentials', { ...auth, redirect: false }).then(
              (response) => {
                if (response?.error) {
                  console.log('Credentials were wrong or Email wasnt verified');
                } else {
                  router.push(process.env.HOST || '/');
                }
              },
            );
          }}
        >
          Login with credentials
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            signIn('discord', { callbackUrl: process.env.HOST });
          }}
        >
          Login with discord
        </button>
      </div>
    </>
  );
};

export default Signin;
