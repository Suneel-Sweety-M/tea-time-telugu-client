import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice"; 

const rootReducer = combineReducers({
  teatimetelugu: userReducer,  
});

export default rootReducer;
