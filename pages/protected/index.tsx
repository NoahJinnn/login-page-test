import Head from 'next/head';
import React from 'react';
import supabase from '../../libs/supabase';

export default function Protected({ user }) {
  return (
    <>
      <Head>
        <title>Protected</title>
      </Head>
      <div style={{ maxWidth: '420px', margin: '96px auto' }}>
        {user ? <h2>Hello, {user.email}</h2> : <div>User data is loading...</div>}
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } };
  }
  return { props: { user } };
}
