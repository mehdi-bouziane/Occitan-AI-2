import Link from 'next/link';
import { createServerSupabaseClient, getSession, getSubscription, getUserDetails } from '@/app/supabase-server';

import Logo from '@/components/icons/Logo';
import SignOutButton from './SignOutButton';
import Chat from './Chat';

import s from './Navbar.module.css';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-2">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <nav className="ml-6 space-x-2 lg:block">
              {user && subscription != null && (
                <Chat />
              )}

              <Link href="/" className={s.link}>
                Pricing
              </Link>

              {user && (
                <Link href="/account" className={s.link}>
                  Account
                </Link>
              )}
            </nav>
          </div>
          <div className="flex justify-end flex-1 space-x-8">
            {user ? (
              <SignOutButton />
            ) : (
              <Link href="/signin" className={s.link}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
