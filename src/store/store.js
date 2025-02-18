import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "../slices/flightSlice";
import passengerReducer from "../slices/passengerSlice"

export const store = configureStore({
    reducer:{
        flightReducer,
        passengerReducer
    }
});