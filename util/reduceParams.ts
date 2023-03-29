import { ConcertParams } from "@/redux/slices/allResults/types";

export async function reduceParams(params: ConcertParams){
    let result = "";
    for(const key in params){
        result = result + `${key}=${params[key as keyof ConcertParams]}`
    }
}