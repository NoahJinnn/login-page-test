import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div style={{ maxWidth: '420px', margin: '96px auto' }}>Welcome!</div>
    </>
  );
};

export default Home;
