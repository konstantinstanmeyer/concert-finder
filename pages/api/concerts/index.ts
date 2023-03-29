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
    genres: string
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
        genres = undefined
    } = req.query as unknown as Params;
    const { data } = await axios.get(process.env.BASE_URL + `events.json?${search ? `keyword=${search}&` : ""}${concertId ? `id=${concertId}&` : ""}${zipcode ? `postalCode=${zipcode}&` : ""}${city ? `city=${city}&` : ""}${stateCode ? `stateCode=${stateCode}&` : ""}${genres ? reduceGenres(genres) : ""}classificationName=Music&page=${page}&size=${size}&apikey=${process.env.API_KEY}`)
    res.status(200).json(data);
}

export function reduceGenres(genres: string): string{
    return genres.split(' ').map(genre => "classificationName=" + genre).join('&')
}