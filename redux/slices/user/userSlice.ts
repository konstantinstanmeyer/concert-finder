import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import axios from "axios";
import { UserState } from "./types";

const initialState: UserState = {
    location: "",
    featured: [],
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {

    }
})

export const getFeatured = (state: RootState) => state.results.city;

export default userSlice.reducer;