import React from 'react'
import { trpc } from "../../utils/trpc";

const characterList = () => {
  const characters =  trpc.backend.getCharacters.useQuery({id:1})
  console.log(characters)
  return (
    <>
    {characters.data?.map(e=><div key={e.id}>Name: {e.name}</div>)}
      {(!characters.data || characters.data?.length<10) && <button>create new char</button>}
    
    </>
  )
}

export default characterList