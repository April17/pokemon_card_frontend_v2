import { combineReducers } from "redux";
import { currentUserReducers } from "./currentUserReducers";
import { utilityReducers } from "./utilityReducers";

export default combineReducers({
    currentUserReducers,
    utilityReducers
});