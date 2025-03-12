import { combineReducers } from "redux";
import eventReducer from "./eventReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  event: eventReducer,
  user: userReducer,
});

export default rootReducer;
