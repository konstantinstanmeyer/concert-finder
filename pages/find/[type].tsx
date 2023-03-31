import { useEffect, useState } from "react"
import { AppDispatch, store } from "@/redux/store"
import { useDispatch } from "react-redux"
import resultsSlice, { rehydrate, findResults } from "@/redux/slices/results/resultsSlice"  
import ConcertCard from "@/components/ConcertCard"  
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"

export const getServerSideProps:GetServerSideProps = async(ctx) => {
    const { query = {} } = ctx || {};
    const {
        type = undefined,
        location = undefined,
        artist: artistId = undefined,
        venue: venueId = undefined,
        search = undefined
    } = query || {};
    let results;

    switch(type){
        case "concerts":
            await store.dispatch(findResults({
                ...(location && { city: (location as string).split(' ')[0]}),
                ...(location && { stateCode: (location as string).split(' ')[1]}),
                type: "events"
            }))
            results = store.getState().results.results;
            return {
                props: { results: results, type: "events" }
            }
            break;
        case "venues":
            await store.dispatch(findResults({
                type: "venues",
                ...(venueId && { id: venueId as string })
            }));
            results = store.getState().results.results;
            return {
                props: { results: results, type: "venues" }
            }
            break;
        case "artists":
            await store.dispatch(findResults({
                type: "attractions",
                ...(search && { search: search as string })
            }));
            results = store.getState().results.results;
            return {
                props: { results: results, type: "artists" }
            }
            break;
        default:
            return {
                props: { results: "reroute", type: "none" }
            }
    }

    
}

export default function FindConcerts(props: InferGetServerSidePropsType<typeof getServerSideProps>){
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { query = {} } = router || {};
    const { search = undefined } = query || {};
    const { results, type }  = props;

    console.log(results);

    useEffect(() => {
        if(results === "reroute") {
            router.push('/find')
        }

        if(results.length < 1 && router.isReady && search){
            dispatch(rehydrate(props));
            // console.log("rehydrated")
        }
    }, [router.isReady])

    return(
        <div className="find">
            {type}
            <ConcertCard />
            <p>hello</p>
        </div>
    )
}