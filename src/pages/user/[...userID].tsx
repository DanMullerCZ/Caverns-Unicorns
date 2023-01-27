
import Header from 'components/general/Header';
import NavigationBar from 'components/NavigationBar';
import UserSettings from 'components/userSettings/UserSettings';
import VideoBackground from 'components/VideoBackground';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trpc } from 'utils/trpc';




export default function userPage() {
  const session = useSession();
  const router = useRouter();
  const urlQuery = (router.query.userID as string[]) || [];

  const deletion = trpc.dbRouter.deleteUser.useMutation();
  const verification = trpc.backend.verifyEmailAgain.useMutation();

  const handleDelete = () => {
    deletion.mutate(session.data?.user?.id as string);
    signOut();
  };

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/');
    }

  });

  const handleSendingMail = async () => {
    verification.mutate(session);
  };

  return (
    <>
      <Header title="User Page" />
      <NavigationBar />
      <VideoBackground />

      <div className="flex h-screen flex-col items-center justify-center text-white">
        <div className="fixed z-10 flex h-screen w-screen items-center justify-center">
          <div className="backgroundSettings "></div>
        </div>
        <div className="flex flex-col items-center rounded-x gold font-LOTR goldnohover z-30 space-y-5  p-10 drop-shadow-lg">
          <h1 className="" test-id="succes login">USERS PAGE</h1>
          <UserSettings />
          <hr />
          <p>{session.data?.user?.name}</p>
          {/* <p>{session.data?.user?.id}</p> */}
          <p>{session.data?.user?.email}</p>

          <hr />

          <p>
            {session.data?.user?.emailVerified
              ? 'Email was succesfully verified'
              : 'Please, verify your email'}
          </p>
          <p>
            {session.data?.user?.premium
              ? 'VIP was succesfully bought'
              : 'Buy premium membership'}
          </p>

          <hr />

          {/* <h2>URL Query as a string: {urlQuery.join('/')}</h2>

          <hr /> */}

          <button onClick={handleDelete}>DELETE USER</button>
          {/* <p>Response from deletion: {deletion.data?.toString()}</p> */}

          <hr />

          <button
            onClick={() => {
              signOut();
              router.push('/');
            }}
          >

            LOG OUT
          </button>

          <hr />

          <button onClick={handleSendingMail}>
            Send verification email once more
          </button>
        </div>
      </div>
    </>
  );
}
