import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import axios from "axios";
import { UserState, FeaturedEventParams } from "./types";

const initialState: UserState = {
    location: "",
    featured: [],
    status: "idle"
}

export const getFeaturedEvents = createAsyncThunk('user/getFeaturedEvents', async(params?: FeaturedEventParams) => {
    const { location, page } = params || {};
    const { data } = await axios.get(`http://localhost:3000/api/featured-events?${location ? `location=${location}&` : ""}${page ? `page=${page}&` : ""}`);
    return data;
})

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        rehydrateFeatured: (state: UserState, action: PayloadAction<any>) => {
            state.featured = action.payload;
            console.log('hydrated')
        }
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

export const { rehydrateFeatured } = userSlice.actions;

export default userSlice.reducer;