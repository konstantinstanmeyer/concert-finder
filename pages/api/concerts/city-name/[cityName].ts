import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function zipcode(req: NextApiRequest, res: NextApiResponse){
    const name = req.query.cityName as string;
    const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${name.indexOf(' ') >= 0 ? name.split(' ').join('+') : name}&apikey=${process.env.API_KEY}`)
    res.status(200).json(data)
}