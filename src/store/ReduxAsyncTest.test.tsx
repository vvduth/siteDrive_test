/* eslint-disable testing-library/no-container */
import React from "react";

import userEvent from "@testing-library/user-event";

import { Stop } from "./stopSlice";
import Stops from "../components/Stops";
import { configureStore } from "@reduxjs/toolkit";
import axios,{AxiosResponse} from "axios";
import { fetchStops } from "./stopSlice";



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
      const mockedResponse : AxiosResponse = {
        data: resp,
        status: 200, 
        statusText: 'OK',
        headers: {},
        config: {}
      }
      const stopsSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce(resp);
      const store = configureStore({
        reducer: function(_state = {stop: null}, action) {
          return {stop: action.payload};
        }
      })
      await store.dispatch(fetchStops("hel"));

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
