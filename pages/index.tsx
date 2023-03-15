import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Home() {
  const { data: session, status } = useSession({ required: true })

  useEffect(() => {
    (async() => {
      const json = await fetch('/api/mongodb')
      console.log(json)
    })()
  }, [])

  return (
    <>
    <Head>
      <title>LiveScene</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
      <p>hello</p>
    </>
  )
}
