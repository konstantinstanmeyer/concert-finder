import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb"

// TODO
export default async function mongoHandler(req: NextApiRequest, res: NextApiResponse){
    const client = await MongoClient.connect("mongodb+srv://konstantin:58OdYd6WUR22hyuQ@cluster0.9jtuxx0.mongodb.net/liveScene?retryWrites=true&w=majority");
    // const db = client.db();
    // const collection = db.collection("testing")
    // await collection.insertOne({ hello: "yes "})
    // client.close();
}