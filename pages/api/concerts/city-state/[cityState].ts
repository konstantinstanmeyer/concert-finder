import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function zipcode(req: NextApiRequest, res: NextApiResponse){
    const cityState = req.query.cityState as string;
    console.log("api" + req.query.cityState)
    const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${cityState.split('+')[0]}&classificationName=Music&stateCode=${cityState.split("+")[1]}&apikey=${process.env.API_KEY}`)
    res.status(200).json(data)
}