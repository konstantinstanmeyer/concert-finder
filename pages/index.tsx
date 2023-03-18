import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { validateLocation } from '@/redux/slices/allConcerts/allConcertsSlice'
import { useAppDispatch, useAppSelector, RootState, AppDispatch } from '@/redux/store'
import { useRouter } from 'next/router'
import { getCity, getStatus, getStateAbbr } from '@/redux/slices/allConcerts/allConcertsSlice'
import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession();
  const [location, setLocation] = useState<String>("");
  const [message, setMessage] = useState<String | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const city = useAppSelector(getCity);
  const cityStatus = useAppSelector(getStatus);
  const stateAbbr = useAppSelector(getStateAbbr);
  const dispatch = useDispatch<AppDispatch>();
  const didType = useRef(false);
  const router = useRouter();

  useEffect(() => {
    (async() => {
      if(router.isReady){
        if(status === 'authenticated'){
          setIsLoading(false);
        } else if(status === 'unauthenticated'){
          router.push('/login');
        }
      }
      // const json = await fetch('/api/mongodb');
      // console.log(json);
    })()
  }, [router.isReady, status])

  useEffect(() => {
    switch(cityStatus){
      case "success":
        setMessage(`${city}, ${stateAbbr}`);
        break;
      case "loading":
        setMessage("loading...");
        break;
      case "error":
        if(didType.current) setMessage("enter valid location");
        break;
    }
  }, [cityStatus])

  async function handleLocationChange(l: String){
    setLocation(l);
    if(l.length > 0){
      dispatch(validateLocation(l));
    }
    if(!didType.current){
      didType.current = true;
    }
  }

  return (
    <div className="home">
      <Head>
        <title>LiveScene</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isLoading ? null : <div className="container search-box">
        <input placeholder="search by zipcode or city..." className="location" type="text" value={location as string} onChange={(e) => handleLocationChange(e.target.value)} />
        <Link href={cityStatus === "success" ? `/city/${city}` : {}} className="search-button">
          <img src="/search.png" className="search-image" />
        </Link>
        <p className="message-home">{message}</p>
      </div>}
    </div>
  )
}
