import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Param } from "../components/RoutesDetails";

export interface EdgeType {
    node :  {
        place :  {
            stop: {
                lat: number,
                lon: number,
                name: string
            },
            stoptimes: [
                {
                    serviceDay: number,
                    scheduledDeparture: number, 
                    trip :{
                        route: {
                            shortName: string, 
                            longName: string
                        }
                    },
                    headsign: string
                }
            ]
        },
        distance: number
    }
}
export interface Departures {
    edges : EdgeType[]
}

export interface DeparturesState {
    departures: Departures | null 
}

export const fetchDepartSchedule = createAsyncThunk("stops/getDepartSchedules", async (param:Param) => {
    const config = {
      headers: {
        "Content-Type": "application/graphql",
      },
    };
    
    
  
    const body2 = `{
        nearest(lat: ${param.lat}, lon: ${param.lon}, maxDistance: 500, filterByPlaceTypes: DEPARTURE_ROW) {
        edges {
          node {
            place {
              ...on DepartureRow {
                stop {
                  lat
                  lon
                  name
                }
                stoptimes {
                  serviceDay
                  scheduledDeparture
                  trip {
                    route {
                      shortName
                      longName
                    }
                  }
                  headsign
                }
              }
            }
              distance
          }
        }
      }
    }
        `;
    try {
      const response = await axios.post(
        `https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`,
        body2,
        config
      );
      console.log(response.data.data.nearest)
      return { ...response.data.data.nearest };
    } catch (e) {
      console.error(e);
      return e.message;
    }
  });
const initialState: DeparturesState = {
    departures : null
}

const departuresSlice = createSlice({
    name: "departures", initialState, 
    reducers: {
        resetDepart(state, action: any) {
            state.departures = action.payload ;
          },
    },
    extraReducers(builder) {
        builder.addCase(fetchDepartSchedule.fulfilled, (state, action: PayloadAction<Departures>) => {
            console.log(action.payload);
            state.departures = action.payload;
        });
        
      },
})

export const { resetDepart } = departuresSlice.actions;
export default departuresSlice.reducer 