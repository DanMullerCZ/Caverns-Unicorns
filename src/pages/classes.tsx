import React, { useState } from 'react';
import Link from 'next/link';
import Classes from 'components/Classes';

const classes = ({ response }: { response: any }) => {
  return (
    <>
      <Link href="/" className="w-6 border border-solid border-black">
        {'<-'}
      </Link>
      <div className="w-full">{response && <Classes classes={response} />}</div>
    </>
  );
};

export default classes;
export const getStaticProps = async () => {
  const res = await prisma!.class.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return {
    props: { response: res },
  };
};
