import { useEffect, useState } from "react"
import { AppDispatch, useAppSelector, store } from "@/redux/store"
import { useDispatch } from "react-redux"
import { rehydrate, fetchConcerts } from "@/redux/slices/allConcerts/allConcertsSlice"    
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"

export const getServerSideProps:GetServerSideProps = async(context) => {
    const { query = {} } = context || {};
    const { search: city = undefined } = query || {};
    let concerts = {};

    if(city){
        await store.dispatch(fetchConcerts(`${(city as string).split(' ')[0]}+${(city as string).split(' ')[1]}`));
        concerts = store.getState().allConcerts.concerts;

        if(concerts){
            return {
                props: { concerts }
            }
        }
    }
}

export default function FindConcerts({ concerts }: InferGetServerSidePropsType<typeof getServerSideProps>){
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { query = {} } = router || {};
    const { search: city = undefined } = query || {};

    useEffect(() => {
        if(concerts.length < 1 && router.isReady && city){
            dispatch(rehydrate(concerts));
        }
    }, [router.isReady])

    return(
        <div className="find">
            <p>hello</p>
        </div>
    )
}