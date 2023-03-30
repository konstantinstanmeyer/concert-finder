import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ZipcodeResponse, CityResponse, SearchParams } from "./types";
import reduceParams from "@/util/reduceParams";
import isBlank from "@/util/isBlank";
import isNumeric from "@/util/isNumeric";
import { RootState } from "../../store";
import axios from "axios";

export interface ResultsState {
    city: string;
    state: string;
    status: string;
    count: Number;
    hasVisited: boolean;
    results: Array<any>;
    pageFormat: string;
}

const initialState: ResultsState = {
    city: "",
    state: "",
    status: 'please enter a valid zipcode or city name',
    count: 0,
    hasVisited: false,
    results: [],
    pageFormat: "default"
}

let abortController;

export const validateLocation = createAsyncThunk('allResults/validateZipcode', async(zipcode: String) => {
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

export const findResults = createAsyncThunk('allResults/findResults', async(params:SearchParams | null=null) => {
    console.log(params);
    const { data } = await axios.get(process.env.BASE_URL + `/api/search${params ? `?${await reduceParams(params)}`: ""}`);
    return { data, type: params?.type };
})

const resultsSlice = createSlice({
    name: "allResults",
    initialState: initialState,
    reducers: {
        setHasVisited: (state: ResultsState, action: PayloadAction<boolean>) => {
            state.hasVisited = action.payload;
        },
        rehydrate: (state: ResultsState, action: PayloadAction<any>) => {
            state.results = action.payload;
        }
    },
    extraReducers(builder){
        builder
            .addCase(validateLocation.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(validateLocation.fulfilled, (state, action: any) => {
                if (action.payload.places){
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
            .addCase(findResults.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(findResults.fulfilled, (state, action: any) => {
                if (action.payload.data?._embedded?.events){
                    state.results = action.payload.data._embedded.events;
                    state.status = "success";
                } else if(action.payload.data?._embedded?.venues) {
                    state.results = action.payload.data._embedded.venues;
                    state.status = "success";
                } else if(action.payload.data?._embedded?.attractions){
                    state.results = action.payload.data._embedded.attractions;
                    state.status = "success";
                } else {
                    state.status = "no results";
                }
            })
            .addCase(findResults.rejected, (state, action: any) => {
                state.status = "please enter valid search"
            })
    }
})

export const getCity = (state: RootState) => state.results.city;
export const getStatus = (state: RootState) => state.results.status;
export const getStateAbbr = (state: RootState) => state.results.state;
export const getCount = (state: RootState) => state.results.count;
export const getHasVisited = (state: RootState) => state.results.hasVisited;
export const getResults = (state: RootState) => state.results.results;

export const { setHasVisited, rehydrate } = resultsSlice.actions;

export default resultsSlice.reducer;