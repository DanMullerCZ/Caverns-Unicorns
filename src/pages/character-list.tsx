import { useState } from 'react';
import Link from 'next/link';
import Characters from 'components/Character-list';
import { getSession, useSession } from 'next-auth/react';
import { NextApiRequest } from 'next';

const CharacterList = ({ response }: { response: any }) => {
  const sessionData = useSession()

  return (
    <>
      <div className="w-full">
        {response && <Characters characters={response} />}
        {sessionData.data && <p>{sessionData.data!.user?.name}: {sessionData.data!.user?.id}</p>}
      </div>
    </>
  );
};
export default CharacterList;

export const getStaticProps = async (context: { req: NextApiRequest }) => {
  const sessionData = await getSession(context);

  const characters = await prisma!.characters.findMany({
    where: {
      owner_id: sessionData?.user?.id,
    },
    select: {
      name: true,
      race:true,
      class: true
      }
    },
  );

  return {
    props: { response: characters },
  };
};
