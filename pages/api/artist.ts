import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { SearchParams } from "@/redux/slices/results/types"
import isArtist from "@/util/isArtist"

export default async function artistEvents(req: NextApiRequest, res: NextApiResponse){
    // grab the cityName from request query params, handle space in url: e.g. "cityName stateCode"
    const {
        id = undefined,
        page = 1,
        search = undefined,
        size = 20,
        city = undefined,
        zipcode = undefined,
        stateCode = undefined,
        genres = undefined,
        type,
    } = req.query as unknown as SearchParams;
    console.log("YESYSY")
    const response = await axios.get(process.env.API_URL + `events.json?${search ? `keyword=${search.indexOf(' ') >= 0 ? search.split(' ').join('+') : search}&` : ""}${zipcode ? `postalCode=${zipcode}&` : ""}${city ? `city=${city}&` : ""}${stateCode ? `stateCode=${stateCode}&` : ""}${genres ? reduceGenres(genres) : ""}${type !== "concerts" ? "classificationName=Music&" : ""}page=${page}&size=${size}&apikey=${process.env.API_KEY}`)
    // console.log(response.data._embedded.events[0]._embedded.attractions.filter((attraction: any) => attraction.name.toLowerCase().includes("The Flaming LIPS".toLowerCase())))
    res.status(200).json(isArtist(response.data, search));
}

export function reduceGenres(genres: string): string{
    return genres.split(' ').map(genre => "classificationName=" + genre).join('&')
}