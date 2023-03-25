import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// handle request using a zipcode, verified within the asyncThunk handling in ...../redux/slices/allConcerts/allConcertsSlice.ts
export default async function zipcode(req: NextApiRequest, res: NextApiResponse){
    const { data } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${req.query.zipcode}&classificationName=Music&apikey=${process.env.API_KEY}`)
    // validate the presence of the response's _embedded folder / else return a falsey value
    if(data?._embedded){
        res.status(200).json(data);
    } else {
        const { data: zipcodeSearch } = await axios.get(`https://api.zippopotam.us/us/` + req.query.zipcode);
        // console.log("search" + zipcodeSearch);
        // response always returns status 200, so the value-checking must be done manually
        if(zipcodeSearch?.["post code"]){
            const name = zipcodeSearch.places[0]["place name"];
            const stateCode = zipcodeSearch.places[0]["state abbreviation"];
            const { data: searchResult } = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${name.indexOf(' ') >= 0 ? name.split(' ').join('+') : name}&classificationName=Music&stateCode=${stateCode}&apikey=${process.env.API_KEY}`)
            res.status(200).json(searchResult);
        } else {
            res.json({ message: "error" })
        }
    }
}