import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Layout } from '../layouts/Layout';

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div style={{ maxWidth: '420px', margin: '96px auto' }}>Welcome!</div>
    </Layout>
  );
};

export default Home;
