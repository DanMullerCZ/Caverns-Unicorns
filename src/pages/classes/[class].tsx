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
import Head from 'next/head';

import Image from 'next/image';
import Header from 'components/general/Header';
import ComponentFourOhFour from 'components/general/ComponentFourOhFour';


export const getStaticProps = async (context: GetStaticPropsContext<{ class: string }>) => {
    const ssg = await createProxySSGHelpers({
        router: appRouter,
        ctx: { session: null },
        transformer: superjson, // optional - adds superjson serialization
    });

    const nameOfClass = context.params?.class as string;
    await ssg.dbRouter.getClass.prefetch(nameOfClass);
    return {
        props: {
            trpcState: ssg.dehydrate(),
            nameOfClass,
        },
        revalidate: 1,
    };
}

export const getStaticPaths = async () => {
    const classes = await prisma.class.findMany(
        { select: { name: true } }
    )
    const paths = classes.map((className) => ({ params: { class: className.name } }))
    return {
        paths,
        fallback: 'blocking',
    }
}


export default function GetRace(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    const { nameOfClass } = props
    const data = trpc.dbRouter.getClass.useQuery(nameOfClass)
    return (
        <>
            <Header title={data.data?.name as string} />
            {data.data ? (
                <>
                    <h1>{data.data.name}</h1>
                    <Image test-id={`image_${data.data.name}`} src={`/${data.data.name}.png`} alt={data.data.name} width={150} height={150} />
                    <p test-id='class_details'>{data.data.description}</p>
                </>
            ): 
            <ComponentFourOhFour />
            }
        </>
    );


}