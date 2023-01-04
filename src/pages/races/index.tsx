import { createProxySSGHelpers } from '@trpc/react-query/ssg';
<<<<<<< HEAD
=======
import Races from 'components/Races';
>>>>>>> dev-main
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

<<<<<<< HEAD
  if (data.status === 'error') {
    return (
      <>
        <p>Internal error occured</p>
      </>
=======
  if(data.status === 'error'){
    return (
        <>
            <p>Internal error occured</p>
        </>
>>>>>>> dev-main
    )
  }

  return (
    <>
<<<<<<< HEAD
      <p>Data status: {data.status}</p>
      <pre>{JSON.stringify(data.data, null, 4)}</pre>
=======
        {/* <p>Data status: {data.status}</p> */}
        {/* <pre>{JSON.stringify(data.data, null, 4)}</pre> */}
        <div>{data.data && <Races races={data.data} />}</div>
>>>>>>> dev-main
    </>
  );
}