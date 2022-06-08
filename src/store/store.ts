import { configureStore, createSlice } from "@reduxjs/toolkit";
import stopReducer from "./stopSlice";
import busRoutesReducer from "./busRoutesSlice";
import departuresReducer from "./departSlice"




export const store = configureStore({
    reducer: {
      stops: stopReducer,
      buses: busRoutesReducer,
      depart: departuresReducer
    },
    
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch