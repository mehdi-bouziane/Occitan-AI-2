'use client';

import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';

import s from './Navbar.module.css';

export default function Chat() {
  const router = useRouter();
  const { supabase } = useSupabase();
  return (
    <button
      className={s.linkChat}
      onClick={async () => {
        router.push('/chat');
      }}
    >
      New chat
    </button>
  );
}
