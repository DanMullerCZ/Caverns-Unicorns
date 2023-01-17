import { signIn } from 'next-auth/react';

export default function ExternalLogin(props: { provider: string }) {
  return (
    <>
      <button
        className=" goldeffect rounded-md  border border-yellow-400 px-4 py-2 "
        onClick={() => {
          signIn(props.provider, { callbackUrl: process.env.HOST });
        }}
      >
        Login with {props.provider}
      </button>
    </>
  );
}
