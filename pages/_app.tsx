import '@/styles/globals.css'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { store } from '@/redux/store'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { Provider } from 'react-redux'
import Head from 'next/head'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{session: Session }>) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Head>
            <title>LiveScene</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  )
}
