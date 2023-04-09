import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Event } from "@/redux/slices/user/types"

interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

interface QueryParams {
    location: string,
    page: string
}

export default async function featured(req: NextApiRequest, res: NextApiResponse){
    // grab the cityName from request query params, handle space in url: e.g. "cityName stateCode"
    const { location, page = 1 } = req.query as unknown as QueryParams;
    const [city, stateCode] = location?.split(' ') || [];
    const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?${city ? `city=${city}&` : ""}${stateCode ? `stateCode=${stateCode}&` : ""}classificationName=Music&sort=random&page=${page}&size=3&countryCode=US&apikey=${process.env.API_KEY}`)
    if(response.data?._embedded?.events){
        // console.log(response.data?._embedded?.events);
        const data = response.data._embedded.events.map((event: any): Event => {
            return {
                name: event.name,
                id: event.id,
                artists: event._embedded?.attractions.map((attraction: any) => {
                    return {
                        name: attraction.name,
                        id: attraction.id,
                    }
                }),
                image: event.images.find(isImage).url,
                startingPrice: event?.priceRanges ? event?.priceRanges[0].min : "na",
                date: event.dates.start.localDate,
                location: event._embedded.venues[0].city.name + " " + event._embedded.venues[0].state.stateCode
            }
        })
        res.status(200).json(data)
    }
}

function isImage(image: Image){
    return image.ratio === "3_2" && image.height > 500 && image.width > 1000;
}