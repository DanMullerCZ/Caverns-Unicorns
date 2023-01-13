import { useRouter } from 'next/router';
import { type NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { useEffect } from 'react';

const VeryfiEmail: NextPage = () => {
  const router = useRouter();
  const token: string | string[] | undefined = router.query.token as string;

  const veryfiEmail = trpc.backend.veryfiEmail.useMutation();
  useEffect(() => {
    veryfiEmail.mutate({ token: token });
  }, []);
  return (
    <div>
      <p>{veryfiEmail.data?.message}</p>
      <p>Token: {token}</p>
    </div>
  );
};

export default VeryfiEmail;
