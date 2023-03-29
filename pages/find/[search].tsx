import { useEffect, useState } from "react"
import { AppDispatch, useAppSelector, store } from "@/redux/store"
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
                    props: { concerts }
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
            props: { results: "none", type: "none" }
        }
    }
}

export default function FindConcerts({ results, type }: InferGetServerSidePropsType<typeof getServerSideProps>){
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { query = {} } = router || {};
    const { search = undefined } = query || {};

    useEffect(() => {
        if(results === "none") {
            router.push('/find')
        }

        if(results.length < 1 && router.isReady && search){
            dispatch(rehydrate(results));
            console.log("rehydrated")
        }
    }, [router.isReady])

    return(
        <div className="find">
            <p>hello</p>
        </div>
    )
}