import removeAccents from "@/util/removeAccents"

interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

// this function is a workaround for Ticketmaster's API having the inability to query events by artist's name
// first, we need to manually search if an artist has any listed events on ticketmaster's database using their "/events" route(concerts/plays/sports)
// e.g. '/events.json?keyword=beyonce' would query for events containing 'beyonce' in any of their key sections, which will return far more results than needed since results are returned on any keyword match not just artist matches (a concert dedicated to beyonce by not performed by her could show up)
// to avoid unwanted results, we can filter through each valid object to find artist matches with certainty (avoids leaving errors from the API)
// this is done by accessing embedded values within the "attractions" (performers/groups) section, which gives us the artist name, id, and image url for any event
// once the artist has been found, grab their given ID and pass it to the '/events' route again, this time as an "attractionId" parameter
// this will return events that match the artist's ID, letting us additionally query by location, distance, and date
export default function validateArtist(events: any, artistsName?: string){
    let results: any = [];
        events._embedded.events.map((event: any) => {
            event._embedded.attractions.filter((attraction: any) => removeAccents(attraction.name)?.toLowerCase().includes((removeAccents(artistsName as string)).toLowerCase())).map((artist: any) => {
                results = [...results, {
                    id: event.id,
                    name: event.name,
                    image: event.images.find(isImage).url,
                    venue: {
                        name: event._embedded.venues[0].name,
                        location: event._embedded.venues[0].city.name + " " + event._embedded.venues[0].state?.stateCode,
                    },
                    artist: {
                        id: artist.id,
                        name: artist.name,
                        image: artist.images.find(isImage).url,
                    },
                }]
            })
        })
    return results;
}

function isImage(image: Image){
    return image.ratio === "3_2" && image.height > 500 && image.width > 1000;
}

// search by artist ID
// attractions/{id} | id is optional (also works for venues and events)
// https://app.ticketmaster.com/discovery/v2/attractions/K8vZ91716g7.json?size=20&page=1&apikey={key}