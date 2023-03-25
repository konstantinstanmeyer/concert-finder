import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ZipcodeResponse, CityResponse, Concert } from "./types";
import isBlank from "@/util/isBlank";
import isNumeric from "@/util/isNumeric";
import { RootState } from "../../store";
import axios from "axios";

export interface AllConcertsState {
    city: string;
    state: string;
    status: string;
    count: Number;
    hasVisited: boolean;
    concerts: Array<any>;
}

const initialState: AllConcertsState = {
    city: "",
    state: "",
    status: 'please enter a valid zipcode or city name',
    count: 0,
    hasVisited: false,
    concerts: []
}

let abortController;

export const validateLocation = createAsyncThunk('allConcerts/validateZipcode', async(zipcode: String) => {
    abortController = new AbortController();
    const abortSignal = abortController.signal;
    if(isNumeric(zipcode)){
        const { data } = await axios.get<ZipcodeResponse>('/api/concerts/zipcode/' + zipcode, {
            signal: abortSignal,
        });
        return data;
    } else {
        const { data } = await axios.get<CityResponse>(`/api/concerts/city-name/${zipcode}`, {
            signal: abortSignal
        })
        return data;
    }
})

export const fetchConcerts = createAsyncThunk('allConcerts/fetchConcerts', async (searchParams: String) => {
    const response = await axios.get(process.env.BASE_URL + '/api/concerts/city-state/' + searchParams);
    return { data: response.data, city: searchParams.split('+')[0], state: searchParams.split('+')[1] };
})

export const findConcerts = createAsyncThunk('allConcerts/findConcerts', async() => {
    const { data } = await axios.get('/api');
    return data;
})

const allConcertsSlice = createSlice({
    name: "allConcerts",
    initialState: initialState,
    reducers: {
        setHasVisited: (state: AllConcertsState, action: PayloadAction<boolean>) => {
            state.hasVisited = action.payload;
        },
        rehydrate: (state: AllConcertsState, action: PayloadAction<any>) => {
            state.concerts = action.payload;
        }
    },
    extraReducers(builder){
        builder
            .addCase(validateLocation.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(validateLocation.fulfilled, (state, action: any) => {
                if(action.payload.places){
                    state.status = "success";
                    state.city = action.payload.places[0]["place name"];
                    state.state = action.payload.places[0]["state abbreviation"];
                } else if(action.payload?._embedded?.events[0]._embedded.venues[0].state?.stateCode){
                    state.status = "success";
                    state.count = action.payload._embedded.events.length;
                    state.state = action.payload?._embedded?.events[0]._embedded.venues[0].state.stateCode;
                    state.city = action.payload?._embedded?.events[0]._embedded.venues[0].city.name;
                } else {
                    state.status = 'error';
                }
            })
            .addCase(fetchConcerts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchConcerts.fulfilled, (state, action: any) => {
                state.concerts = action.payload.data._embedded.events;
                if(isBlank(state.city) || isBlank(state.state)){
                    state.city = action.payload.data.city;
                    state.city = action.payload.data.state;
                }
            })
            .addCase(fetchConcerts.rejected, (state, action: any) => {
                state.status = "invalid zipcode";
            })
            .addCase(findConcerts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(findConcerts.fulfilled, (state, action: any) => {
                console.log(action.payload);
            })
            .addCase(findConcerts.rejected, (state, action: any) => {
                state.status = "no results"
            })
    }
})

export const getCity = (state: RootState) => state.allConcerts.city;
export const getStatus = (state: RootState) => state.allConcerts.status;
export const getStateAbbr = (state: RootState) => state.allConcerts.state;
export const getCount = (state: RootState) => state.allConcerts.count;
export const getHasVisited = (state: RootState) => state.allConcerts.hasVisited;
export const getConcerts = (state: RootState) => state.allConcerts.concerts;

export const { setHasVisited, rehydrate } = allConcertsSlice.actions;

export default allConcertsSlice.reducer;