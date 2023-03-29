interface Image {
    ratio: String;
    url: String;
}

interface Event {
    name: String;
    type: String;
    id: String;
    url: String;
    images: Array<Image>;
}

export interface CityResponse {
    _embedded: {
        events: Array<Event>;
    }
}

interface Place {
    "place name": String;
    "state abbreviation": String;
}

export interface ZipcodeResponse {
    places: Array<Place>; 
}

export interface Concert {
    id: String;
    name: String;
    url: String;
    image: String;
    artist: String;
    genres: Array<string>;
    minPrice: number;
    maxPrice: number;
    city: String;
    state: String;
}