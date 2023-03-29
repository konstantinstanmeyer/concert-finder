import { useEffect, useState } from "react"
import { AppDispatch, store } from "@/redux/store"
import { useDispatch } from "react-redux"
import { rehydrate, fetchConcerts } from "@/redux/slices/allResults/allResultsSlice"    
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"

export const getServerSideProps:GetServerSideProps = async(context) => {
    const { query = {} } = context || {};
    const {
        search: type = undefined,
        location = undefined,
        artist: artistId = undefined,
        venue: venueId = undefined,
    } = query || {};
    let concerts = {};

    if(type === "concerts"){
        if(location){
            await store.dispatch(fetchConcerts(`${(location as string).split(' ')[0]}+${(location as string).split(' ')[1]}`));
            concerts = store.getState().allConcerts.concerts;
    
            if(concerts){
                return {
                    props: { results: concerts, type: "concerts" }
                }
            } else {
                return {
                    props: { results: [], type: "concerts" }
                }
            }
        } else {
            return {
                props: { results: [], type: "concerts" }
            }
        }
    } else if(type === "venues") {
        if(venueId){
            // await store.dispatch();
        } else {
            return {
                props: { results: [], type: "venues" }
            }
        }
    } else if(type === "artists") {
        if(artistId){
            // await store.dispatch();
        } else {
            return {
                props: { results: [], type: "artists" }
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