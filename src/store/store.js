import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "../slices/flightSlice";

export const store = configureStore({
    reducer:flightReducer
});