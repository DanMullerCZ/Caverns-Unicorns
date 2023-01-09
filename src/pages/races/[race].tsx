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
import RaceDetail from 'components/RaceDetail';
import Image from 'next/image';
import Head from 'next/head';

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
      <Head>
        <title>{data?.data?.name}</title>
      </Head>
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
      {data.data && (
        <>
          <h1>{data.data.name}</h1>
          <Image test-id={`image${data.data.name}`} src={`/${data.data.name.toLowerCase()}.png`} alt={data.data.name} width={150} height={150} />
          <p test-id='race_details'>{data.data.description}</p>
        </>
      )}

    </>
  );


}