import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { Layout } from '../layouts/Layout';
import Authenticator from '../components/Authenticator';
import { createContext } from 'react';
import { authMachine, AuthService } from '../machines/authMachine';
import { useInterpret } from '@xstate/react';
interface GlobalContextType {
  authService: AuthService;
}
export const GlobalStateContext = createContext({} as GlobalContextType);

function MyApp({ Component, pageProps }) {
  const authService = useInterpret(authMachine);

  return (
    <GlobalStateContext.Provider value={{ authService }}>
      <Layout>
        <Authenticator />
        <Component {...pageProps} />
      </Layout>
    </GlobalStateContext.Provider>
  );
}

export default MyApp;
