import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import stopReducer from "./stopSlice";
import busRoutesReducer from "./busRoutesSlice";


const middlewares = [thunk];

export const store = configureStore({
    reducer: {
      stops: stopReducer,
      buses: busRoutesReducer
    },
    
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch