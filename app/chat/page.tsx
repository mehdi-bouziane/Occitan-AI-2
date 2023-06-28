import { getSession, getSubscription, getUserDetails } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import * as console from 'console';
import * as process from 'process';

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
    if (subscription.prices.products.id) {
      product = subscription.prices.products.id;
    }
  }

  if (product === '') {
    return redirect('/');
  }

  return (
    <>
    <section style={{ height: '92vh' }} className="mb-32 bg-black">
        <iframe
                title="Chainlit"
                width="100%"
                height="100%"
                src={
                  product === process?.env?.NEXT_PUBLIC_ID_PRODUCT_LITE ? process?.env?.LINK_IFRAME_LITE_PRODUCT :
                  product === process?.env?.NEXT_PUBLIC_ID_PRODUCT_PRO ? process?.env?.LINK_IFRAME_PRO_PRODUCT :
                  product === process?.env?.NEXT_PUBLIC_ID_PRODUCT_ADVANCED ? process?.env?.LINK_IFRAME_ADVANCED_PRODUCT :
                    undefined
                }
        >
        </iframe>
    </section>
    </>
  );
}

