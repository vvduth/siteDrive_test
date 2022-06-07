import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export interface EdgeType {
    node :  {
        place :  {
            stop: {
                lat: number,
                lon: number,
                name: string
            },
            stoptime: [
                {serviceDay: number}
            ]
        }
    }
}
export interface Departures {
    edges : {
        
    }
}