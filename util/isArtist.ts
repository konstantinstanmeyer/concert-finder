interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
}

// this funciton is a workaround for Ticketmaster's API having the inability to query events by artist name
// first, we need to manually search if an artist has any listed events on ticketmaster's database using their "events" route(concerts/plays/sports)
// the only parameteter to 
// then, we can grab the artist's ID value, and pass it to the concert query, passing an artist ID in the parameters
// functions to receive events, filter for 
export default function validateArtist(events: any, artistsName?: string){
    let results: any = [];
        events._embedded.events.map((event: any) => {
            event._embedded.attractions.filter((attraction: any) => attraction.name.toLowerCase().includes(artistsName?.toLowerCase())).map((artist: any) => {
                results = [...results, {
                    id: event.id,
                    name: event.name,
                    image: event.images.find(isImage).url,
                    venue: {
                        name: event._embedded.venues[0].name,
                        location: event._embedded.venues[0].city.name + " " + event._embedded.venues[0].state.stateCode,
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
// https://app.ticketmaster.com/discovery/v2/attractions/K8vZ91716g7.json?size=20&page=1&apikey=a7rd3x3JAOWhafuN7Qp5uYPcal6gBt7r