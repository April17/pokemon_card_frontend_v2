// import { API_ROOT, HEADERS } from '../../assets/API_Route';
import { actions } from "../actions/cartActions";


export const editCart = cartData => dispatch => {
    localStorage.cart = JSON.stringify(cartData)
    dispatch(actions.editCart(cartData))
};