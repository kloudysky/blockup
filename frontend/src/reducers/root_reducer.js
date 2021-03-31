import { combineReducers } from "redux";
import session from "./session_api_reducer";
import errors from "./errors_reducer";
import MessagesReducer from "./messages_reducer";

const RootReducer = combineReducers({
  errors,
  messages: MessagesReducer,
  session,
});


export default RootReducer;
