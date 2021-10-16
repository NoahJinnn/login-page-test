import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import supabase from '../libs/supabase';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated');
  useEffect(() => {
    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
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
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState('authenticated');
      router.push('/profile');
    }
  }

  return <Component {...pageProps} />;
}

export default MyApp;
