import 'bring/styles/globals.css';
import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react';



export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}