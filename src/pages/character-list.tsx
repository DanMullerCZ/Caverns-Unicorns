import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { trpc } from 'utils/trpc';
import CharactersDetail from 'components/Character-list';
import { Characters } from '@prisma/client';


const CharacterList = () => {
  const sessionData = useSession();
  const res = trpc.dbRouter.getCharacters.useMutation()
  const deletion = trpc.dbRouter.deleteCharacter.useMutation();
  
  const [characters, setCharacters] = useState<Characters[]>([]);
  
  const handleDeletion = (id: number, index: number) => {
    deletion.mutate(id);
    setCharacters((prevChar) => {
      prevChar.splice(index, 1)
      return prevChar;
    });
    if (localStorage.getItem('char_id') === id.toString()) {
      localStorage.setItem('char_id', characters[0].id.toString());
    }
  }

  useEffect(()=>{ 
    if (sessionData.data?.user?.id) { 
      res.mutate(sessionData.data.user.id);
    }
  },[sessionData])
  
  useEffect(() => {
    if (res.data)
      setCharacters(res.data)
  }, [res.data])
  
  useEffect(()=>{
    if (sessionData.status == 'unauthenticated'){
        window.location.href='/login'
    }
  },[])

  return (
    <>
      <div className="w-screen h-screen">
        {characters && <CharactersDetail characters={characters} handleDeletion={handleDeletion} />}
      </div>
    </>
  );
};
export default CharacterList;