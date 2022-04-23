import { combineReducers } from "redux";
import keyReducer, { pressKey, releaseKey } from "./keyReducer";

export default combineReducers({
  key: keyReducer,
});

export { pressKey, releaseKey };
