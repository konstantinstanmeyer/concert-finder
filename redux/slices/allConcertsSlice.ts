import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

export interface AllCategoriesState {
    city: String;
    state: String;
    status: String;
}

interface Place {
    "place name": String;
    "state abbreviation": String;
}

interface ZipcodeResponse {
    places: Array<Place>; 
}

const initialState: AllCategoriesState = {
    city: "",
    state: "",
    status: 'please enter a valid zipcode or city name',
}

export const validateZipcode = createAsyncThunk('allCategories/validateZipcode', async(zipcode: String) => {
    const { data } = await axios.get<ZipcodeResponse>('https://api.zippopotam.us/us/' + zipcode);
    return data;
})

const allConcertsSlice = createSlice({
    name: "allConcerts",
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder){
        builder
            .addCase(validateZipcode.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(validateZipcode.fulfilled, (state, action: any) => {
                if(action.payload.places){
                    state.status = "success";
                    state.city = action.payload.places[0]["place name"];
                    state.state = action.payload.places[0]["state abbreviation"];
                } else {
                    state.status = 'error';
                }
            })
            .addCase(validateZipcode.rejected, (state, action: any) => {
                state.status = "invalid zipcode"
            })
    }
})

export const getCity = (state: RootState) => state.allConcerts.city;
export const getStatus = (state: RootState) => state.allConcerts.status;
export const getStateAbbr = (state: RootState) => state.allConcerts.state;

export default allConcertsSlice.reducer;