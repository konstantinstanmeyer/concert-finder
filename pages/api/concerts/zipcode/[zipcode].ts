import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function zipcode(req: NextApiRequest, res: NextApiResponse){
    const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${req.query.zipcode}&classificationName=Music&apikey=${process.env.API_KEY}`)
    res.status(200).json(data)
}