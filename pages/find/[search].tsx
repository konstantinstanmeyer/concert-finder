import { useEffect, useState } from "react"
import { AppDispatch, useAppSelector, store } from "@/redux/store"
import { useDispatch } from "react-redux"
import { ChangeEvent } from "react"
import { rehydrate, fetchConcerts } from "@/redux/slices/allConcerts/allConcertsSlice"    
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"

export const getServerSideProps:GetServerSideProps = async(context) => {
    const { query = {} } = context || {};
    const { search: city = undefined } = query || {};
    let concerts = {};

    if(city){
        console.log(await store.dispatch(fetchConcerts(`${(city as string).split(' ')[0]}+${(city as string).split(' ')[1]}`)));
        concerts = store.getState().allConcerts.concerts;

        if(concerts){
            return {
                props: {
                    concerts: concerts
                }
            }
        }
    }
}

export default function FindConcerts({ concerts }: InferGetServerSidePropsType<typeof getServerSideProps>){
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [value, setValue] = useState<number>(0)
    const { query = {} } = router || {};
    const { search: city = undefined } = query || {};

    console.log(concerts)

    useEffect(() => {
        if(concerts.length < 1 && router.isReady && city){
            dispatch(rehydrate(concerts));
        }
    }, [router.isReady, value])

    return(
        <div className="find">
            <p>hello</p>
            <input type="number" value={value} onChange={(e: any) => setValue(e.target.value)} />
        </div>
    )
}