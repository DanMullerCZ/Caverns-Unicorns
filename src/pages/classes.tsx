import React, { useState } from 'react'
import Link from 'next/link'
import Classes from 'components/Classes'
import { Class } from '@prisma/client'

const classes =  ({response}:{response:any}) => {
    
      return (
        <>
        <Link href='/' className='border-black border-solid border w-6'>{'<-'}</Link>
    <div className='w-full'>
       {response && <Classes  classes={response}/> }
    </div>
    </>
  )
}

export default classes
 export const getStaticProps = async () => {
  const res:Class[] =  await prisma!.class.findMany({
    orderBy: {
      name: 'asc',
    },
  }) as Class[]
  return {
    props:{response:res}
  }
 }
