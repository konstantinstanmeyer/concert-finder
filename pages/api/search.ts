import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface Params {
    concertId: string,
    page: string,
    search: string,
    size: string,
    zipcode: string,
    city: string,
    stateCode: string,
    genres: string,
    type: string
}

export default async function concertSearch(req: NextApiRequest, res: NextApiResponse){
    // grab the cityName from request query params, handle space in url: e.g. "cityName stateCode"
    const {
        concertId = undefined,
        page = 1,
        search = undefined,
        size = 20,
        city = undefined,
        zipcode = undefined,
        stateCode = undefined,
        genres = undefined,
        type,
    } = req.query as unknown as Params;
    console.log(type !== "concerts" ? "" : "classificationName=Music&")
    const response = await axios.get(process.env.API_URL + `${type}.json?${search ? `keyword=${search}&` : ""}${concertId ? `id=${concertId}&` : ""}${zipcode ? `postalCode=${zipcode}&` : ""}${city ? `city=${city}&` : ""}${stateCode ? `stateCode=${stateCode}&` : ""}${genres ? reduceGenres(genres) : ""}${type !== "concerts" ? "classificationName=Music&" : ""}page=${page}&size=${size}&apikey=${process.env.API_KEY}`)
    console.log("response: ")
    console.log(response)
    res.status(200).json(response.data);
}

export function reduceGenres(genres: string): string{
    return genres.split(' ').map(genre => "classificationName=" + genre).join('&')
}