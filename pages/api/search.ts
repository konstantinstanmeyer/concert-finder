import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { SearchParams } from "@/redux/slices/results/types"

// Returns key information for general search queries, taking in multiple parameters and "porting" them to Ticketmaster's "Discovery" API
export default async function concertSearch(req: NextApiRequest, res: NextApiResponse){
    // default optional parameters to undefined to later handle with ternary expressions
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

    // handle query param logic for all search routes, allow for dynamic responses using ternary expressions to display important values
    // using ticketMasters's API docs, https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
    // three main types of responses:
    // 1) events -> returns concerts and festivals, also used to determine whether a location has upcoming concerts by passing values into the "stateCode" and "city" paramaters
    // 2) attractions -> pertains to something or someone who is doing the performance, for this use-case returning artist information, which requires a typeId and subTypeId set to TicketMaster's correlating "Musician" IDs
    // 3) venues -> query by location and keywords, returns an array of events, venue information, and minimal artist information
    const response = await axios.get(
        // possible improvement would be to create a utility function that reduces the incoming params into a single string, then concat the string to the base url
        process.env.API_URL + type + `${id ? `/${id}` : ""}.json?${type === "artists" ? "typeId=KZAyXgnZfZ7v7la&subTypeId=KZFzBErXgnZfZ7vAd7&" : ""}${search ? `keyword=${search}&` : ""}${concertId ? `id=${concertId}&` : ""}${zipcode ? `postalCode=${zipcode}&` : ""}${city ? `city=${city}&` : ""}${stateCode ? `stateCode=${stateCode}&` : ""}${genres ? reduceGenres(genres) : ""}${type !== "attractions" ? "classificationName=Music&" : ""}page=${page}&size=${size}&sort=random&apikey=${process.env.API_KEY}`
    )
    res.status(200).json(response.data);
}

export function reduceGenres(genres: string): string{
    return genres.split(' ').map(genre => "classificationName=" + genre).join('&')
}