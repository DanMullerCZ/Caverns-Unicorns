import React, { useState } from 'react'
import { trpc } from '../utils/trpc'
import Link from 'next/link'

const races = () => {
    const [race,setRace]=useState('')
    const handleChange = (event:any)=>{
        setRace(event.target.value)
    }
    const addRace = trpc.backend.races.useMutation()
    const handleClick = () => {
        addRace.mutate({'name':race})
    }
   // if (addRace.isSuccess){console.log(addRace.data)}
  return (
    <>
        <input onChange={handleChange} type="text" name="race" id="race" />
        <button onClick={handleClick}>Add race</button>
        {addRace.error && <p>{addRace.error.message}</p>}
        <Link href='/'>{'<-'}</Link>
    </>
  )
}

export default races