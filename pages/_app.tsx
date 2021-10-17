import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import supabase from '../libs/supabase';
import { Layout } from '../layouts/Layout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated');
  useEffect(() => {
    //* fires when a user signs in or out
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session);
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated');
        router.push('/profile');
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated');
      }
    });
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    //* when the component loads, checks user to show or hide Sign In link
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState('authenticated');
      router.push('/profile');
    }
  }

  async function handleAuthChange(event, session) {
    //* sets and removes the Supabase cookie
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }

  return <Component {...pageProps} />;
}

export default MyApp;
