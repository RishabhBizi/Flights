import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    passenger:[]
}

export const passengerSlice = createSlice({
    name:"passenger",
    initialState,
    reducers:{
        addPassenger:(state,action)=>{
            state.passenger.push(action.payload)
        },
        removePassenger:(state,action)=>{
            state.passenger = state.passenger?.filter(passenger=>passenger?.id != action.payload)
        }
    }
})

export const {addPassenger,removePassenger}=passengerSlice.actions;

export default passengerSlice.reducer;