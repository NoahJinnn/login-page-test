import { useActor } from '@xstate/react';
import { useRouter } from 'next/dist/client/router';
import React, { useContext, useEffect, useState } from 'react';
import supabase from '../libs/supabase';
import { LOGOUT_EVENT, VERIFY_EVENT } from '../machines/authMachine';
import { GlobalStateContext } from '../pages/_app';

export default function Authenticator() {
  const router = useRouter();
  const globalServices = useContext(GlobalStateContext);
  const [, send] = useActor(globalServices.authService);
  useEffect(() => {
    //* fires when a user signs in or out
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session);
      if (event === 'SIGNED_IN') {
        send({ type: VERIFY_EVENT, userData: session.user });
        router.push('/profile');
      }
      if (event === 'SIGNED_OUT') {
        send(LOGOUT_EVENT);
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
      send(VERIFY_EVENT);
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
  return <div></div>;
}
