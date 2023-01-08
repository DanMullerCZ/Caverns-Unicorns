import { prisma } from '../../server/db/client';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
} from 'next';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { trpc } from 'utils/trpc';

import Image from 'next/image';


export const getStaticProps = async(context: GetStaticPropsContext<{ class: string }>)=>{
       
        const nameOfClass =  context.params?.class
        const classDetail = await prisma.class.findFirst({where:{name:nameOfClass}, orderBy: {
            name: 'asc',
          },})
    
        return {
            props : {classDetail:classDetail}
        }
}

export const getStaticPaths = async () => {
    const classes = await prisma.class.findMany(
        { select: { name: true } }
    )
    const paths = classes.map((className)=>({params:{class:className.name}}))
    return {
        paths,
        fallback: 'blocking',
    }
}


export default function GetRace(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    const {classDetail} = props
    
    return (
        <>
            {classDetail && (
                <>
                    <h1>{classDetail.name}</h1>
                    <Image src={`/${classDetail.name}.png`} alt={classDetail.name} width={150} height={150} />
                </>
            )}
        </>
    );


}