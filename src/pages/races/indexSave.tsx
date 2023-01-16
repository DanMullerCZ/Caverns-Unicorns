import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import RaceList from 'components/RaceList';
import { GetStaticPropsContext } from 'next';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { trpc } from 'utils/trpc';
import Head from 'next/head';
import { useState } from 'react';

export async function getStaticProps() {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: { session: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  // prefetch `races`
  await ssg.dbRouter.getAllRaces.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
}

export default function GetAllRaces() {
  const data = trpc.dbRouter.getAllRaces.useQuery()
    
  const [selectedRace, setSelectedRace] = useState("")
  const setRace = (e: string) => {
    setSelectedRace(e)
  }

  if (data.status === 'error') {
    return (
      <>
        <p>Internal error occured</p>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Races</title>
      </Head>
      {/* <p>Data status: {data.status}</p> */}
      {/* <pre>{JSON.stringify(data.data, null, 4)}</pre> */}
      <div>{data.data && <RaceList races={data.data} setRace={setRace} selectedRace={selectedRace} />}</div>
    </>
  );
}