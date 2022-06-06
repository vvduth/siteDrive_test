import { createSlice } from "@reduxjs/toolkit";

export interface Route {
    code : string, 
    directionId: number,
    headsign: string , 
    route : {
        gtfsId: string , 
        shortName: string, 
        longName: string , 
        mode: string 
    }
}

export interface Routes {
    stop: {
        gtfsId: string ,
        name: string, 
        lat: number,
        lon: number,
        patterns: Route[]
    }
}

export interface RoutesState {
    routes: {[gtfsId: string]: Route}
}

const initialState: RoutesState = {
    routes: {}
}

const routesSlice = createSlice({
    name: "routes", initialState, reducers: {}
})

export default routesSlice.reducer