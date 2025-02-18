import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    flight:{}
}
export const flightSlice = createSlice({
    name:"flight",
    initialState,
    reducers:{
        addFlight:(state,action)=>{
            const flightPayload = action.payload;
            state.flight=flightPayload;
        }
    }
})
export const {addFlight}=flightSlice.actions;

export default flightSlice.reducer;