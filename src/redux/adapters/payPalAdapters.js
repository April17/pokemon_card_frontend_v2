import { actions } from "../actions/payPalActions";

export const shippingAdapter = (shippingData) => dispatch => {
    dispatch(actions.shippingAction(shippingData))
}