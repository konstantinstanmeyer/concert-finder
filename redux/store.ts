import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";
import allConcertsSlice from "./slices/allConcertsSlice";

export const store = configureStore({
    reducer: {
        allConcerts: allConcertsSlice
    }
})

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;