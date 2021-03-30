import { combineReducers } from "redux";
import session from "./session_api_reducer";
import errors from "./errors_reducer";
import RoomsReducer from "./rooms_reducer";

const RootReducer = combineReducers({
  errors,
  session,
  rooms: RoomsReducer,
});

export default RootReducer;
