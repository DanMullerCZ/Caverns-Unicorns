import { getSession, useSession } from 'next-auth/react';
import { NextApiRequest } from 'next';
import { useEffect, useState } from 'react';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { trpc } from 'utils/trpc';
import { Characters } from '@prisma/client';
import CharactersDetail from 'components/Character-list';


const CharacterList = () => {
  const sessionData = useSession();
  const res = trpc.dbRouter.getCharacters.useMutation()
  //const [characters,setCharacters]=useState<Characters[]>([])
  useEffect(()=>{ 
    if (sessionData.data?.user?.id) res.mutate(sessionData.data.user.id);
  },[sessionData])
  //if(res.isSuccess){setCharacters(res.data)}
  
  
  useEffect(()=>{
    if (sessionData.status == 'unauthenticated'){
        window.location.href='/login'
    }
  },[])

  return (
    <>
      <div className="w-full">
        {res.data && <CharactersDetail characters={res.data} />}
        {sessionData.data && (
              <p>
            {sessionData.data?.user?.name}: {sessionData.data?.user?.id}
          </p>

        )}
      </div>
    </>
  );
};
export default CharacterList;

// export async function getServerSideProps() {
//   const ssg = await createProxySSGHelpers({
//     router: appRouter,
//     ctx: { session: null },
//     transformer: superjson, // optional - adds superjson serialization
//   });

  
//   const sessionData = await getSession();
//   await ssg.dbRouter.getCharacters.prefetch(sessionData?.user?.id);
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//     },
//     revalidate: 1,
//   };
// }

// export const getServerSideProps = async (context: { req: NextApiRequest }) => {
//   const sessionData = await getSession(context);
//   let characters
//   if(sessionData?.user?.id){

//      characters = await prisma?.characters.findMany({
//       where: {
//         owner_id: sessionData?.user?.id,
//       },
//       select: {
//         name: true,
//         race:true,
//         class: true,
//         id:true
//       },
//   });
//   }else {characters=[]}

//   return {
//     props: { response: characters },
//   };
// };
// const ssg = await createProxySSGHelpers({
//   router: appRouter,
//   ctx: { session: null },
//   transformer: superjson, // optional - adds superjson serialization
// });
// const sessionData = await getSession(context);
// if (sessionData?.user?.id) {await ssg.dbRouter.getCharacters.prefetch(sessionData?.user?.id);}
// return {
//   props: {
//     trpcState: ssg.dehydrate(),
//   },
//   revalidate: 1,
// };
// }