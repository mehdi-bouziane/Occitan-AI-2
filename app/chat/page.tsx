import { getSession, getSubscription, getUserDetails } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import * as console from 'console';

export default async function Chat() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }

  let product : string = '';

  if (subscription && subscription.prices && subscription.prices.products && subscription.prices.products.active) {
    if (subscription.prices.products.name) {
      product = subscription.prices.products.name;
    }
  }

  return (
    <>
    <section style={{ height: '92vh' }} className="mb-32 bg-black">
        <iframe
                title="Chainlit"
                width="100%"
                height="100%"
                src={
                  product === 'Basic' ? process.env.LINK_IFRAME_BASIC_PRODUCT :
                  product === 'Standard' ? process.env.LINK_IFRAME_STANDARD_PRODUCT :
                  product === 'Premium' ? process.env.LINK_IFRAME_PREMIUM_PRODUCT : undefined
                }
        >
        </iframe>
    </section>
    </>
  );
}

