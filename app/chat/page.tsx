import axios from 'axios';
import { getSession, getSubscription, getUserDetails } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import * as console from 'console';
import * as process from 'process';
import https from 'https';

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

  let body = new FormData();
  let token = '';
  body.append("username", String(process?.env?.AUTH_CHAINLIT_SERVER_USER));
  body.append("password", String(process?.env?.AUTH_CHAINLIT_SERVER_PASSWORD));

// Créez un agent HTTPS avec votre certificat.
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  const urlChat = process?.env?.LINK_IFRAME_LITE_PRODUCT;

  try {
    const res = await axios.post(urlChat + `/token`, body, {
      httpsAgent: agent
    });

    token = res.data.access_token;
  } catch (err) {
    console.log(err);
  }

  return (
    <>
    <section style={{ height: '92vh' }} className="mb-32 bg-black">
        <iframe
                title="Chainlit"
                width="100%"
                height="100%"
                src={
                  urlChat + '?token=' + token
                }
        >
        </iframe>
    </section>
    </>
  );
}

