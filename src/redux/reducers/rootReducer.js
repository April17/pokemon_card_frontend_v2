import { combineReducers } from "redux";
import { currentUserReducers } from "./currentUserReducers";
import { utilityReducers } from "./utilityReducers";
import { frontPageReducers } from "./frontPageReducers"

export default combineReducers({
    currentUserReducers,
    utilityReducers,
    frontPageReducers
});