import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import resultsSlice from "./slices/results/resultsSlice";
import userSlice from "./slices/user/userSlice";

export const store = configureStore({
    reducer: {
        results: resultsSlice,
        user: userSlice,
    }
})

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;