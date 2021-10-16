import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../layouts/Layout';
import supabase from '../../libs/supabase';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  async function fetchProfile() {
    const profileData = await supabase.auth.user();
    if (!profileData) {
      router.push('/login');
    } else {
      setProfile(profileData);
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
    <Layout>
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
    </Layout>
  );
};

export default Profile;
