export interface ArtistQuery{
    _embedded: {
        events: Array<Event>
    }
}

interface Event {
    name: string;
    _embedded: {
        venues: Array<Venue>;
    }
}

interface Venue {
    name: string;
    id: string;
    city: {
        name: string;
    };
    state: {
        name: string;
        stateCode: string;
    }
}

interface Attraction {
    name: string;
    id: string;
}