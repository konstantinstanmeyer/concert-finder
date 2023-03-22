import { useEffect, useState } from "react"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { getConcerts, fetchConcerts } from "@/redux/slices/allConcerts/allConcertsSlice"    
import { useRouter } from "next/router"

export default function FindConcerts(){
    const concerts = useAppSelector(getConcerts);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const { query = {} } = router || {};
    const { search: city = undefined } = query || {};

    useEffect(() => {
        if(concerts.length < 1 && router.isReady && city){
            dispatch(fetchConcerts(`${(city as string).split(' ')[0]}+${(city as string).split(' ')[1]}`));
        }
    }, [router.isReady])

    return(
        <div className="find">
            <p>hello</p>
        </div>
    )
}