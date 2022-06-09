import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Stop {
  gtfsId: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
}
export const BusStopsQuery = `{
  stops(name: "asdasds") {
    gtfsId
    name
    code
    lat
    lon
  }
}`;
export interface StopState {
  stops: { [gtfsId: string]: Stop } | null;
}

const initialState: StopState = {
  stops: null,
};

export const fetchStops = createAsyncThunk("stops/getAllStops", async (k:string) => {
  const config = {
    headers: {
      "Content-Type": "application/graphql",
    },
  };


  const body2 = `{
            stops(name: "${k}") {
              gtfsId
              name
              code
              lat
              lon
            }
          }`;
  try {
    const response = await axios.post(
      `https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`,
      body2,
      config
    );
    //console.log(response.data.data.stops)
    return { ...response.data.data.stops };
  } catch (e) {
    console.error(e);
    return e.message;
  }
});



const stopSlice = createSlice({
  name: "stops",
  initialState,
  reducers: {
    receivedStops(state, action: PayloadAction<Stop[]>) {
      state.stops = {};
      const stops = action.payload;
      stops.forEach((stop) => {
        state.stops[stop.gtfsId] = stop; // covert array into product object
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchStops.fulfilled, (state, action: PayloadAction<Stop[]>) => {
      state.stops = {};
      const stops = action.payload;
      const stopArr = Object.values(stops);
      stopArr.forEach((stop) => {
        state.stops[stop.gtfsId] = stop; // covert array into product object
      });
    });
  },
});

export const { receivedStops } = stopSlice.actions;
export default stopSlice.reducer;
