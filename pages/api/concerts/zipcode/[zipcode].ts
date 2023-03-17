import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function zipcode(req: NextApiRequest, res: NextApiResponse){
    const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${req.query.zipcode}&apikey=${process.env.API_KEY}`)

    res.status(200).json(data)
}