import { loadStripe, StripeError } from '@stripe/stripe-js';
import Header from 'components/general/Header';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export default function Checkout() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      alert('You have to be logged in to enter this page');
      router.push('/login');
    }
  });

  const handleClick = async () => {
    const { sessionId } = await fetch('api/stripe/checkout/session', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ quantity: 1 }),
    }).then((res) => res.json());

    const stripe = await stripePromise;
    const { error } = (await stripe?.redirectToCheckout({
      sessionId,
    })) as { error: StripeError };

    if (error) {
      router.reload();
    }
  };

  return (
    <>
      <Header title="Shop" />
      <div>
        <h1>Checkout</h1>
        <h2>{}</h2>
        <button role="link" onClick={handleClick}>
          Click HERE to buy your PREMIUM MEMBERSHIP
        </button>
      </div>
    </>
  );
}
