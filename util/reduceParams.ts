import { ConcertParams } from "@/redux/slices/results/types";

export default async function reduceParams(params: ConcertParams){
    let result = "";
    for(const key in params){
        if(!params[key as keyof ConcertParams]) null
        else if(!result.length && params[key as keyof ConcertParams]) result = `${key}=${params[key as keyof ConcertParams]}` + result
        else result =  `${key}=${params[key as keyof ConcertParams]}&` + result;
    }
    return result;
}