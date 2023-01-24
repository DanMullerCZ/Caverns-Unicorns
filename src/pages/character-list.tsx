import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { trpc } from 'utils/trpc';
import CharactersDetail from 'components/Character-list';


const CharacterList = () => {
  const sessionData = useSession();
  const res = trpc.dbRouter.getCharacters.useMutation()
  useEffect(()=>{ 
    if (sessionData.data?.user?.id) res.mutate(sessionData.data.user.id);
  },[sessionData])
  
  
  useEffect(()=>{
    if (sessionData.status == 'unauthenticated'){
        window.location.href='/login'
    }
  },[])

  return (
    <>
      <div className="w-screen h-screen">
        {res.data && <CharactersDetail characters={res.data} />}
      </div>
    </>
  );
};
export default CharacterList;