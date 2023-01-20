import Characters from 'components/Character-list';
import { getSession, useSession } from 'next-auth/react';
import { NextApiRequest } from 'next';
import { useEffect } from 'react';


const CharacterList = ({ response }: { response: any }) => {
  const sessionData = useSession();

  
  useEffect(()=>{
    if (!sessionData.data?.user?.id){
        window.location.href='/login'
    }
  },[])

  return (
    <>
      <div className="w-full">
        {response && <Characters characters={response} />}
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

export const getServerSideProps = async (context: { req: NextApiRequest }) => {
  const sessionData = await getSession(context);
  let characters
  if(sessionData?.user?.id){

     characters = await prisma?.characters.findMany({
      where: {
        owner_id: sessionData?.user?.id,
      },
      select: {
        name: true,
        race:true,
        class: true,
        id:true
      },
  });
  }else {characters=[]}

  return {
    props: { response: characters },
  };
};
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