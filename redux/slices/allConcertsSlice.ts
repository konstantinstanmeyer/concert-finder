import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    status: 'idle',
}


export const validateZipcode = createAsyncThunk('allCategories/validateZipcode', async(zipcode: Number) => {
    const response = await axios.get<ZipcodeResponse>('https://api.zippopotam.us/us/' + zipcode);
    return response;
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
                if(action.payload?.places){
                    state.city = action.payload.places["state name"];
                    state.state = action.payload.places["state abbreviation"];
                } else {
                    state.status = 'error';
                }
            })
    }
})

export default allConcertsSlice.reducer;