import '@/styles/globals.css'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { store } from '@/redux/store'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{session: Session }>) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}
