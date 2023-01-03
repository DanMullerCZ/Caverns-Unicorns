import React, { useState } from 'react'
import { trpc } from '../utils/trpc'
import Link from 'next/link'
import Races from 'components/Races'

const races =  ({response}:{response:any}) => {
    const [race,setRace]=useState('')
    const handleChange = (event:any)=>{
        setRace(event.target.value)
    }
    const addRace = trpc.backend.races.useMutation()
    const handleClick = () => {
        addRace.mutate({'name':race})
    }
    
    //console.log(response && response[0])

    
      return (
        <>
        <Link href='/' className='border-black border-solid border w-6'>{'<-'}</Link>
    <div className='w-full'>
        {/* <h2>Races with amazing styling!</h2> */}
        {/* <form >
        <input onChange={handleChange} type="text" name="race" id="race" className='border-black border-solid border' />
        <button type='button' onClick={handleClick} className='border-black border-solid border'>Add race</button>
        </form>
        {addRace.error && <p className='border-black border-solid border'>{addRace.error.message}</p>}
        {addRace.isSuccess && <p className='border-black border-solid border'>Succesfully added race {race} to the database.</p>} */}
        {response && <Races  races={response}/> }
    </div>
    </>
  )
}

export default races
 export const getStaticProps = async () => {
  const res =  await prisma!.race.findMany({
    orderBy: {
      name: 'asc',
    },
  })
  return {
    props:{response:res}
  }
 }
