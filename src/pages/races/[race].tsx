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

export async function getStaticProps(
    context: GetStaticPropsContext<{ race: string }>,
) {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const race = context.params?.race as string;
  // prefetch `race`
  await ssg.dbRouter.getRace.prefetch(race);
  return {
    props: {
      trpcState: ssg.dehydrate(),
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
    fallback: 'blocking',
  };
};

export default function GetRace(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { race } = props;
  const data = trpc.dbRouter.getRace.useQuery(race)

  console.log(race)

  return (
    <>
      {/* <h1>{data.name}</h1>
      <p>Here is your race:::</p>
      <ul>
      <li>Charisma: {data?.char}</li>
      <li>Strength: {data?.str}</li>
      <li>Wisdom: {data?.wis}</li>
      <li>Constitution: {data?.con}</li>
      <li>Dexterity: {data?.dex}</li>
      <li>Intelligence: {data?.int}</li>
    </ul> */}
        <p test-id='race_detail_status'>Data status: {data.status}</p>
        <pre test-id='race_detail'>{data.data ? JSON.stringify(data.data, null, 4) : 'No such race in Caverns & Unicorns'}</pre>
    </>
  );


}