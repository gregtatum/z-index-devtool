import { combineReducers } from "redux";

import stackingContextReducer from "./stacking-context";
export default combineReducers({
  stackingContext: stackingContextReducer
});
