import { createSlice } from "@reduxjs/toolkit";

export interface Stop {
        gtfsId: string,
        name: string,
        code: string,
        lat: number,
        lon: number
}
const stop1: Stop = {gtfsId: "wasdasd", name:"tampere", code: 'dsads',lat:11,lon:22}
export interface StopState {
    stops: {[gtfsId: string]: Stop, }
}

const initialState : StopState = {
    stops: {
        stop1
    }
}

const stopSlice = createSlice({
    name: "stops", 
    initialState, 
    reducers:{}
})
export default stopSlice.reducer ;