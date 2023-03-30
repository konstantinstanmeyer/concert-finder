import { useEffect, useState } from "react"
import { AppDispatch, store } from "@/redux/store"
import { useDispatch } from "react-redux"
import resultsSlice, { rehydrate, findResults } from "@/redux/slices/results/resultsSlice"    
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"

export const getServerSideProps:GetServerSideProps = async(ctx) => {
    const { query = {} } = ctx || {};
    const {
        search: type = undefined,
        location = undefined,
        artist: artistId = undefined,
        venue: venueId = undefined,
    } = query || {};
    let results;

    if(type === "concerts"){
        if(location){
            let [city, stateCode] = (location as string).split(" ");
            await store.dispatch(findResults({
                city: city,
                stateCode: stateCode,
                type: "events"
            }));
            results = store.getState().results.results;
    
            if(results){
                return {
                    props: { results: results, type: "concerts" }
                }
            } else {
                return {
                    props: { results: [], type: "concerts" }
                }
            }
        } else {
            await store.dispatch(findResults({
                type: "concerts"
            }));
            results = store.getState().results.results;
            return {
                props: { results: results, type: "concerts" }
            }
        }
    } else if(type === "venues") {
        if(venueId){
            await store.dispatch(findResults({
                type: "concerts"
            }));
        } else {
            await store.dispatch(findResults({
                type: "venues"
            }));
            results = store.getState().results.results;
            return {
                props: { results: results, type: "venues" }
            }
        }
    } else if(type === "artists") {
        if(artistId){
            await store.dispatch(findResults({
                type: "events",
            }));
        } else {
            await store.dispatch(findResults({
                type: "events",
            }));
            results = store.getState().results.results;
            return {
                props: { results: results, type: "artists" }
            }
        }
    } else {
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
            <p>hello</p>
        </div>
    )
}