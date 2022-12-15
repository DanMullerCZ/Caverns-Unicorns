import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { prisma } from "../server/db/client";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { userAgent } from "next/server";




const Home: NextPage = () => {

  //const race = trpc.backend.race.useQuery()
  //const races = trpc.backend.getRaces.useQuery()
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const [signIn, setSignIn] = useState(false)
  const [register, setRegister] = useState(false)
  const [userId,setUserId] = useState(0)


  const handleChange = (event: any) => {

    setUser({ ...user, [event.target.name]: event.target.value })
  }
  
  const creation = trpc.backend.registration.useMutation()
  const createUser = async () => {
      const res =  creation.mutate(user)
      console.log( res)
      
     
  }
  //const logInUser = trpc.backend.logInUser.useMutation()



  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        {(!register && !signIn) && <div>
          <h1>Welcome!</h1>
          <button onClick={() => setSignIn(true)}>Login</button>
          <button onClick={() => setRegister(true)}>Register</button>
        </div>
        }
        {register && <form className="grid grid-rows-3 gap-1" >
          <input className="border border-solid border-black" onChange={handleChange} type="text" name="username" id="username" />
          <input className="border border-solid border-black" onChange={handleChange} type="password" name="password" id="password" />
          <button type="button" onClick={createUser} className="bg-red-400 border-gray-900">Registrate</button>
          <button type="button" onClick={() => setRegister(false)}>{'<-'}</button>
        </form>}
        {signIn && <form className="grid grid-rows-3 gap-1">
          <input className="border border-solid border-black" onChange={handleChange} type="text" name="username" id="username" />
          <input className="border border-solid border-black" onChange={handleChange} type="password" name="password" id="password" />
          <button type="button"  className="bg-red-400 border-gray-900">Login</button>
          <button type="button" onClick={() => setSignIn(false)}>{'<-'}</button>
        </form> }
        {/* <p className='bg-white'>{race.data?.name}</p>
        {races.data?.map(e=>(<div key={e.id} className='bg-white'> {e.name}</div>))} */}
        <Link href='/character-list'>characters</Link>
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
