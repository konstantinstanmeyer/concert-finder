export interface Event {
    name: string;
    id: string;
    artists: Array<{
        name: string;
        id: string;
    }> | null;
    startingPrice: number;
    date: string;
    location: string;
    image: string;
}

export interface UserState {
    location: string;
    featured: Array<Event>;
    status: string;
}