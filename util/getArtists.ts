export default function validateArtist(events: any){
    const results = events._embedded.events.map((event: any) => {
        const validEvents = event._embedded.attractions.filter((attraction: any) => attraction.name === "The Flaming Lips").map((concert: any) => {
        return {
        id: concert.id,
        eventName: event._embedded.venues[0].name,
        artist: concert.name,
        location: event._embedded.venues[0].city.name + event._embedded.venues[0].state.stateCode
        };
    })
        return validEvents
    })
    return results;
}

// search by artist ID
// attractions/{id} | id is optional (also works for venues and events)
// https://app.ticketmaster.com/discovery/v2/attractions/K8vZ91716g7.json?size=20&page=1&apikey=a7rd3x3JAOWhafuN7Qp5uYPcal6gBt7r