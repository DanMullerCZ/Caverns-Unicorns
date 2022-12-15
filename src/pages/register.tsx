import React from 'react'
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import Link from 'next/link';

const register = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const handleChange = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }
  const creation = trpc.backend.registration.useMutation()
  const createUser =  () => {
        creation.mutate(user)
        }
        
  if (creation.isSuccess) window.location.href='/login'
      //creation.data?.id
  return (
    <>
     <form className="grid grid-rows-3 gap-1" >
          <input className="border border-solid border-black" onChange={handleChange} type="text" name="username" id="username" />
          <input className="border border-solid border-black" onChange={handleChange} type="password" name="password" id="password" />
          <button type="button" onClick={createUser} className="bg-red-400 border-gray-900">Registrate</button>
          {creation.error && <p>{creation.error.message}</p>}
          <Link href={'/'}>{'<-'}</Link>
        </form> 
    </>
  )
}

export default register