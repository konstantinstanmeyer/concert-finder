import { SearchParams } from "@/redux/slices/results/types";

export default async function reduceParams(params: SearchParams){
    let result = "";
    for(const key in params){
        if(!params[key as keyof SearchParams]) null
        else if(!result.length && params[key as keyof SearchParams]) result = `${key}=${params[key as keyof SearchParams]}` + result
        else result =  `${key}=${params[key as keyof SearchParams]}&` + result;
    }
    return result;
}