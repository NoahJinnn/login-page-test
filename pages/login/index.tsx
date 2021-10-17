import { useMachine } from '@xstate/react';
import Head from 'next/head';
import React, { useState } from 'react';
import supabase from '../../libs/supabase';
import {
  authMachine,
  AUTH_AUTHENTICATED_MS,
  AUTH_LOADING_MS,
  LOGIN_EVENT,
  LOGIN_EVENT_ERROR,
  LOGIN_EVENT_SUCCESS,
} from '../../machines/authMachine';

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [state, send] = useMachine(authMachine);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    send(LOGIN_EVENT);
    const { error } = await supabase.auth.signIn({ email });
    if (!error) {
      send(LOGIN_EVENT_SUCCESS);
    } else {
      send({ type: LOGIN_EVENT_ERROR, errorMessage: error.message });
    }
  };

  const changeMail = (e) => {
    setEmail(e.target.value);
  };

  if (state.value === AUTH_LOADING_MS) {
    return (
      <div className="border rounded-lg p-12 w-4/12 mx-auto my-48 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  } else if (state.value === AUTH_AUTHENTICATED_MS) {
    return (
      <div className="border rounded-lg p-12 w-4/12 mx-auto my-48 flex justify-center">
        <h1>Please check your email to sign in</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="border rounded-lg p-12 w-4/12 mx-auto my-48">
        <h3 className="font-extrabold text-3xl">Aloha!</h3>

        <p className="text-gray-500 text-sm mt-4">
          Fill in your email, we'll send you a magic link.
        </p>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Your email address"
            className="border w-full p-3 rounded-lg mt-4 focus:border-indigo-500"
            onChange={changeMail}
          />

          <button
            type="submit"
            className="bg-indigo-500 text-white w-full p-3 rounded-lg mt-8 hover:bg-indigo-700"
          >
            Let's go!
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
