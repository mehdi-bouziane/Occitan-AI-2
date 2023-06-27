import { Fragment } from 'react';
import Pricing from '@/components/Pricing';
import CookieConsent from '@/components/ui/Cookie/CookieConsent'
import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';

export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  return (
    <Fragment>
      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
      <CookieConsent/>
    </Fragment>
  );
}
