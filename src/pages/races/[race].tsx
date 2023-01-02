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
import { dbRouter } from 'server/routers/dbRouter';


export async function getStaticProps(
    context: GetStaticPropsContext<{ race: string }>,
) {
//   const ssg = await createProxySSGHelpers({
//     router: appRouter,
//     ctx: {},
//     transformer: superjson, // optional - adds superjson serialization
//   });

  const race = context.params?.race as string;
  // prefetch `post.byrace`
//   await ssg.race.byrace.prefetch({ race });
  return {
    props: {
    //   trpcState: ssg.dehydrate(),
      race,
    },
    revalidate: 1,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const races = await prisma.race.findMany({
    select: {
      name: true,
    },
  });
  return {
    paths: races.map((race) => ({
      params: {
        race: race.name,
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: 'blocking',
  };
};


export default function ViewRaces(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { race } = props;
  const data = trpc.dbRouter.getAllRaces.useQuery()

//   if (data.status !== 'success') {
//     return <>Loading...</>;
//   }

  console.log(data.status)

  return (
    <>
      {/* <h1>{data.name}</h1>
      <p>Here is your race:::</p>
        <p>{data?.name}</p>
        <ul>
            <li>Charisma: {data?.char}</li>
            <li>Strength: {data?.str}</li>
            <li>Wisdom: {data?.wis}</li>
            <li>Constitution: {data?.con}</li>
            <li>Dexterity: {data?.dex}</li>
            <li>Intelligence: {data?.int}</li>
        </ul> */}
        <pre>{JSON.stringify(data.data, null, 4)}</pre>
    </>
  );


}