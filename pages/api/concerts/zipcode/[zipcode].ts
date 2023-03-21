import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function zipcode(req: NextApiRequest, res: NextApiResponse){
    const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${req.query.zipcode}&classificationName=Music&apikey=${process.env.API_KEY}`)
    if(data._embedded){
        res.status(200).json(data);
    } else {
        const { data: zipcodeSearch } = await axios.get(`https://api.zippopotam.us/us/` + req.query.zipcode);
        console.log("search" + zipcodeSearch);
        if(zipcodeSearch?.["post code"]){
            const name = zipcodeSearch.places[0]["place name"];
            const stateCode = zipcodeSearch.places[0]["state abbreviation"];
            const { data: searchResult } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${name.indexOf(' ') >= 0 ? name.split(' ').join('+') : name}&classificationName=Music&stateCode=${stateCode}&apikey=${process.env.API_KEY}`)
            console.log(searchResult);
            res.status(200).json(searchResult);
        } else {
            res.json({ message: "error" })
        }
    }
}