import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ZipcodeResponse, CityResponse } from "./types";
import isNumeric from "@/util/isNumeric";
import { RootState } from "../../store";
import axios from "axios";

export interface AllCategoriesState {
    city: String;
    state: String;
    status: String;
    count: Number;
    hasVisited: boolean;
}

const initialState: AllCategoriesState = {
    city: "",
    state: "",
    status: 'please enter a valid zipcode or city name',
    count: 0,
    hasVisited: false,
}

export const validateLocation = createAsyncThunk('allCategories/validateZipcode', async(zipcode: String) => {
    if(isNumeric(zipcode)){
        const { data } = await axios.get<ZipcodeResponse>('/api/concerts/zipcode/' + zipcode);
        return data;
    } else {
        const { data } = await axios.get<CityResponse>(`/api/concerts/city-name/${zipcode}`)
        return data;
    }
})

const allConcertsSlice = createSlice({
    name: "allConcerts",
    initialState: initialState,
    reducers: {
        setHasVisited: (state: AllCategoriesState, action: PayloadAction<boolean>) => {
            state.hasVisited = action.payload;
        },
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
            .addCase(validateLocation.rejected, (state, action: any) => {
                state.status = "invalid zipcode"
            })
    }
})

export const getCity = (state: RootState) => state.allConcerts.city;
export const getStatus = (state: RootState) => state.allConcerts.status;
export const getStateAbbr = (state: RootState) => state.allConcerts.state;
export const getCount = (state: RootState) => state.allConcerts.count;
export const getHasVisited = (state: RootState) => state.allConcerts.hasVisited;

export const { setHasVisited, setLocation } = allConcertsSlice.actions;

export default allConcertsSlice.reducer;