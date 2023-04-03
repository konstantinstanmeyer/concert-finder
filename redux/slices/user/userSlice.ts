import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import axios from "axios";
import { UserState } from "./types";

const initialState: UserState = {
    location: "",
    featured: [],
}

export const getFeaturedEvents = createAsyncThunk('user/getFeaturedEvents', async(location?: string) => {
    const { data } = await axios.get(`/api/featured${location ? `?location=${location}` : ""}`);
    return data;
})

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder){

    }
})

export const getFeatured = (state: RootState) => state.user.featured;
export const getLocation = (state: RootState) => state.user.location;

export default userSlice.reducer;