export interface Event {
    name: string;
    artist: {
        name: string;
        id: string;
    };
    startingPrice: number;
    date: string;
    location: string;
    image: string;
}

export interface UserState {
    location: string;
    featured: Array<Event>;
}