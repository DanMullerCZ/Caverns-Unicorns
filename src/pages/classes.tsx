import React, { useState } from 'react'
import Link from 'next/link'
import ClassList from 'components/ClassList'
import { Class } from '@prisma/client'

const classes =  ({response}:{response:any}) => {
    
      return (
        <>
        <Link href='/' className='border-black border-solid border w-6'>{'<-'}</Link>
    <div className='w-full'>
       {response && <ClassList  classes={response}/> }
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
