import { actions } from "../actions/payPalActions";

export const totalAdapter = (total) => dispatch => {
    dispatch(actions.totalAction(total))
}