import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import axios from "axios";
import { UserState } from "./types";

const initialState: UserState = {
    location: "",
    featured: [],
    status: "idle"
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
        builder
            .addCase(getFeaturedEvents.pending, (state, action: any) => {

            })
            .addCase(getFeaturedEvents.fulfilled, (state, action: any) => {
                state.featured = action.payload;
                state.status = "success";
            })
            .addCase(getFeaturedEvents.rejected, (state, action: any) => {
                
            })
    }
})

export const getFeatured = (state: RootState) => state.user.featured;
export const getLocation = (state: RootState) => state.user.location;

export default userSlice.reducer;