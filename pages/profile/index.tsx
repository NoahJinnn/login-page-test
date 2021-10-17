import { useActor } from '@xstate/react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import supabase from '../../libs/supabase';
import { VERIFY_MS } from '../../machines/authMachine';
import { GlobalStateContext } from '../_app';

const Profile = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.authService);
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  async function fetchProfile() {
    if (state.value !== VERIFY_MS || !Boolean(state.context?.userData)) {
      router.push('/login');
    } else {
      setProfile(state.context?.userData);
    }
  }
  async function signOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div style={{ maxWidth: '420px', margin: '96px auto' }}>
        {profile ? (
          <>
            <h2>Hello, {profile.email}</h2>
            <button
              onClick={signOut}
              type="submit"
              className="bg-indigo-500 text-white w-full p-3 rounded-lg mt-8 hover:bg-indigo-700"
            >
              Sign Out
            </button>
          </>
        ) : (
          <div>User data is loading...</div>
        )}
      </div>
    </>
  );
};

export default Profile;
