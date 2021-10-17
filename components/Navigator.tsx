import React, { useContext } from 'react';
import Link from 'next/link';
import { GlobalStateContext } from '../pages/_app';
import { useActor } from '@xstate/react';
import { AUTH_UNAUTHENTICATED_MS, VERIFY_MS } from '../machines/authMachine';

export default function Navigation() {
  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.authService);
  return (
    <>
      <nav className="flex items-center flex-wrap bg-indigo-500 p-3 ">
        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:mr-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link href="/">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-indigo-600 hover:text-white ">
                Home
              </a>
            </Link>
            {state.value === AUTH_UNAUTHENTICATED_MS && (
              <Link href="/login">
                <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-indigo-600 hover:text-white">
                  Login
                </a>
              </Link>
            )}
            {state.value === VERIFY_MS && (
              <>
                <Link href="/profile">
                  <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-indigo-600 hover:text-white">
                    Profile
                  </a>
                </Link>
                <Link href="/protected">
                  <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-indigo-600 hover:text-white">
                    Protected
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
