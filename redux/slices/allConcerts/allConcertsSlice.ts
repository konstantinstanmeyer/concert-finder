import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ZipcodeResponse, CityResponse } from "./types";
import isNumeric from "@/util/isNumeric";
import { RootState } from "../../store";
import axios from "axios";

export interface AllCategoriesState {
    city: String;
    state: String;
    status: String;
    count: Number
}

const initialState: AllCategoriesState = {
    city: "",
    state: "",
    status: 'please enter a valid zipcode or city name',
    count: 0,
}

export const validateLocation = createAsyncThunk('allCategories/validateZipcode', async(zipcode: String) => {
    if(isNumeric(zipcode)){
        const { data } = await axios.get<ZipcodeResponse>('https://api.zippopotam.us/us/' + zipcode);
        return data;
    } else {
        const { data } = await axios.get<CityResponse>(`https://app.ticketmaster.com/discovery/v2/events.json?city=${zipcode}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`)
        return data;
    }
})



const allConcertsSlice = createSlice({
    name: "allConcerts",
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder){
        builder
            .addCase(validateLocation.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(validateLocation.fulfilled, (state, action: any) => {
                console.log(action.payload)
                if(action.payload.places){
                    state.status = "success";
                    state.city = action.payload.places[0]["place name"];
                    state.state = action.payload.places[0]["state abbreviation"];
                } else if(action.payload?._embedded){
                    state.status = "success";
                    state.count = action.payload._embedded.events.length;
                    console.log(action.payload._embedded.events.length)
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

export default allConcertsSlice.reducer;