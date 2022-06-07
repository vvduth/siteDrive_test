import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Stop {
        gtfsId: string,
        name: string,
        code: string,
        lat: number,
        lon: number
}

export interface StopState {
    stops: {[gtfsId: string]: Stop, }
}

const initialState : StopState = {
    stops: {
        
    }
}

const stopSlice = createSlice({
    name: "stops", 
    initialState, 
    reducers:{
        receivedStops(state, action: PayloadAction<Stop[]>) {
            state.stops = {}
            const stops = action.payload ;
            stops.forEach(stop => {
                state.stops[stop.gtfsId] = stop ; // covert array into product object
            })
        }
    }
})


export const {receivedStops} = stopSlice.actions ;
export default stopSlice.reducer ;