import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { SearchParams } from "@/redux/slices/results/types"

export default async function artistSearch(req: NextApiRequest, res: NextApiResponse){
    // grab the cityName from request query params, handle space in url: e.g. "cityName stateCode"
    const {
        id = undefined,
        page = 1,
        search = undefined,
        size = req.query.type === "attractions" ? 200 : 20,
        city = undefined,
        zipcode = undefined,
        stateCode = undefined,
        genres = undefined,
        type,
    } = req.query as unknown as SearchParams;
    const response = await axios.get(process.env.API_URL + `${type}${id ? `/${id}` : ""}.json?${type === "attractions" ? "typeId=KZAyXgnZfZ7v7la&subTypeId=KZFzBErXgnZfZ7vAd7&" : ""}${search ? `keyword=${search.indexOf(' ') >= 0 ? search.split(' ').join('+') : search}&` : ""}${zipcode ? `postalCode=${zipcode}&` : ""}${city ? `city=${city}&` : ""}${stateCode ? `stateCode=${stateCode}&` : ""}${genres ? reduceGenres(genres) : ""}${type !== "concerts" ? "classificationName=Music&" : ""}page=${page}&size=${size}&apikey=${process.env.API_KEY}`)
    res.status(200).json(response.data);
}

export function reduceGenres(genres: string): string{
    return genres.split(' ').map(genre => "classificationName=" + genre).join('&')
}