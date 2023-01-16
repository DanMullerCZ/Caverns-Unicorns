import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Chat } from 'components/Chat';
import { trpc } from '../utils/trpc';
import { useState } from 'react';
import VideoBackground from 'components/VideoBackground';
import NavigationBar from 'components/NavigationBar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Caverns & Unicorns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VideoBackground />
      <NavigationBar />
      <main className="goldeffect gold mx-auto flex flex-col items-center justify-center gap-10 px-6 py-8 font-LOTR md:h-screen">
        <VideoBackground />
        <h1 className=" goldeffect gold text-[100px]">
          Welcome to Caverns & Unicorns
        </h1>
        <AuthShowcase />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const [message, setMessage] = useState<string>(
    'This is the subscription field',
  );

  trpc.wsRouter.sub.useSubscription(undefined, {
    onData(data: any) {
      setMessage(data);
    },
  });

  return (
    <div className="text-[40px]">
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>

      <button
        className="goldeffect mr-12 "
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? 'Log Out' : 'Log In'}
      </button>
      {!sessionData && 
        <Link className="goldeffect" href={'/registration'}>
          Register
        </Link>}
    </div>
  );
};
