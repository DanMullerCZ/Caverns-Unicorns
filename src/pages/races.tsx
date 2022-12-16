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
    
  return (
    <div className='grid grid-cols-1 w-52'>
        <h2>Races with amazing styling!</h2>
        <input onChange={handleChange} type="text" name="race" id="race" className='border-black border-solid border' />
        <button onClick={handleClick} className='border-black border-solid border'>Add race</button>
        {addRace.error && <p className='border-black border-solid border'>{addRace.error.message}</p>}
        {addRace.isSuccess && <p className='border-black border-solid border'>Succesfully added race {race} to the database.</p>}
        <Link href='/' className='border-black border-solid border w-6'>{'<-'}</Link>
    </div>
  )
}

export default races