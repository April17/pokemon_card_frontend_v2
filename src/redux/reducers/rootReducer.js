import { combineReducers } from "redux";
import { currentUserReducers } from "./currentUserReducers";
import { utilityReducers } from "./utilityReducers";
import { frontPageReducers } from "./frontPageReducers"
import { cartReducers } from "./cartReducers"
import { searchReducers } from "./searchReducers";
import { payPalReducers } from "./payPalReducers";

export default combineReducers({
    currentUserReducers,
    utilityReducers,
    frontPageReducers,
    cartReducers,
    searchReducers,
    payPalReducers
});