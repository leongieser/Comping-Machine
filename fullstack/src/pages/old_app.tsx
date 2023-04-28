import 'bring/styles/globals.css';
import Layout from '../components/old_Layout'
import { SessionProvider } from 'next-auth/react';
import LoginModal from 'bring/components/modals/loginModal';

export default function App({ Component, pageProps, session }) {


  return (
    <>
      <SessionProvider session={session}>
        <LoginModal/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
