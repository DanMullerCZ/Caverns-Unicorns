import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Races from 'components/Races';
import { GetStaticPropsContext } from 'next';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { trpc } from 'utils/trpc';

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

  if(data.status === 'error'){
    return (
        <>
            <p>Internal error occured</p>
        </>
    )
  }

  return (
    <>
        {/* <p>Data status: {data.status}</p> */}
        {/* <pre>{JSON.stringify(data.data, null, 4)}</pre> */}
        <div>{data.data && <Races races={data.data} />}</div>
    </>
  );
}