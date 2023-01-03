import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Chat } from 'components/Chat';
import { trpc } from '../utils/trpc';
import { useState } from 'react';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>D&D</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>D&D</p>

        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const s = useSession();
  s.data?.user?.id;

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );
  console.log(sessionData);
  const [message, setMessage] = useState<string>(
    'This is the subscription field',
  );
  trpc.wsRouter.sub.useSubscription(undefined, {
    onData(data) {
      setMessage(data);
    },
  });
  const messenger = trpc.wsRouter.input.useMutation();
  const handleChange = (ev: React.FormEvent<EventTarget>) => {
    const target: HTMLInputElement = ev.target as HTMLInputElement;

    messenger.mutate({ typing: target.value });
  };
  return (
    <div>
      <p>{sessionData?.user?.email}</p>
      <p>{sessionData?.user?.id}</p>

      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button onClick={sessionData ? () => signOut() : () => signIn()}>
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
      <br />
      <Link href={'/signup'}>Create new account</Link>
      <p>{message}</p>
      <input
        type="text"
        onChange={handleChange}
        className="border-4 border-black"
      />
      <Chat />
    </div>
  );
};
