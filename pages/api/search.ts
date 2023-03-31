import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { SearchParams } from "@/redux/slices/results/types"

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
        id = undefined,
    } = req.query as unknown as SearchParams;
    // console.log(type)
    const response = await axios.get(process.env.API_URL + `${type}${id ? `/${id}` : ""}.json?${type === "artists" ? "typeId=KZAyXgnZfZ7v7la&subTypeId=KZFzBErXgnZfZ7vAd7&" : ""}${search ? `keyword=${search}&` : ""}${concertId ? `id=${concertId}&` : ""}${zipcode ? `postalCode=${zipcode}&` : ""}${city ? `city=${city}&` : ""}${stateCode ? `stateCode=${stateCode}&` : ""}${genres ? reduceGenres(genres) : ""}${type !== "attractions" ? "classificationName=Music&" : ""}page=${page}&size=${size}&sort=random&apikey=${process.env.API_KEY}`)
    res.status(200).json(response.data);
}

export function reduceGenres(genres: string): string{
    return genres.split(' ').map(genre => "classificationName=" + genre).join('&')
}