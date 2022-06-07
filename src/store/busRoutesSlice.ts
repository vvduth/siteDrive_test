import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
        gtfsId: string | null,
        name: string | null, 
        lat: number | null,
        lon: number| null,
        patterns: Route[] | null,
    
} 


export const fetchBusRoutes = createAsyncThunk("stops/getAllBuses", async (k:string) => {
    const config = {
      headers: {
        "Content-Type": "application/graphql",
      },
    };
  
  
    const body2 = `{
        stop(id: "${k}") {
          gtfsId
          name
          lat
          lon
          patterns {
            code
            directionId
            headsign
            route {
              gtfsId
              shortName
              longName
              mode
            }
            
          }
        }
      }`;
    try {
      const response = await axios.post(
        `https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`,
        body2,
        config
      );
      //console.log(response.data.data)
      return { ...response.data.data.stop };
    } catch (e) {
      console.error(e);
      return e.message;
    }
  });
  

export interface RoutesState {
    routes:  Routes
}

const initialState: RoutesState = {
    routes: null
}

const routesSlice = createSlice({
    name: "routes", initialState, 
    reducers: {
        
    },
    extraReducers(builder) {
        builder.addCase(fetchBusRoutes.fulfilled, (state, action: PayloadAction<Routes>) => {
            console.log(action.payload)
            const routes = action.payload;
            const routesArr = Object.values(routes); 
            console.log(routesArr);
            state.routes = action.payload ;
            
        });
        
      },
})

export default routesSlice.reducer