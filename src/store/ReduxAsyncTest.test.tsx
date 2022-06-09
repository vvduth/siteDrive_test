/* eslint-disable testing-library/no-container */


import { Stop, fetchStops } from "./stopSlice";

import { configureStore } from "@reduxjs/toolkit";
import axios,{AxiosResponse} from "axios";

jest.mock('axios')


interface Response {
  
    data: {data: {
      stops: Stop[];
    };}
  
}

describe("Async component", () => {
  test("ttest matching bus", async () => {
      const resp:Response = {
          data: {
            data: {
              stops: []
            }
          }
      } 
      const stopsSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce(resp);
      const store = configureStore({
        reducer: function(_state = {stop: null}, action) {
          return {stop: action.payload};
        }
      })
      const action = await store.dispatch(fetchStops("hel"));

      const body2 = `{
        stops(name: "dasda") {
          gtfsId
          name
          code
          lat
          lon
        }
      },{"headers": {"Content-Type": "application/graphql"}}`;
      expect(stopsSpy).toBeCalled()
      //expect(stopsSpy).toBeCalledWith(`https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`, body2)
      const state = store.getState() ;
      console.log(state);
      expect(state.stop).toEqual({});

  });
});
