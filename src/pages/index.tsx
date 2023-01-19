import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';
import { useState } from 'react';
import VideoBackground from 'components/VideoBackground';
import NavigationBar from 'components/NavigationBar';
import Header from 'components/general/Header';

const Home: NextPage = () => {
  return (
    <>
      <Header title='Home Page'/>
      <VideoBackground />
      <NavigationBar />
      <main className="goldeffect gold mx-auto flex flex-col items-center justify-center gap-10 px-6 py-8 font-LOTR md:h-screen">

        <h1 test-id='succes delete' className=" goldeffect gold text-[100px]">

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
