import ItemInShop from 'components/ItemInShop';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Shop() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/login');
    }
  });

  return (
    <>
      <h1>Page is in development</h1>
      <ItemInShop name='VIP' price={500} link='https://buy.stripe.com/test_aEU5kJb4M6ha5huaEF'/>
      <Link href="/" className="w-6 border border-solid border-black">
        BACK TO THE HOMEPAGE
      </Link>

    </>
  );
}
