import { API_ROOT, HEADERS } from '../../assets/API_Route';
import { actions } from "../actions/cartActions";


export const addToCart = itemData => dispatch => {
    dispatch(actions.addToCart(itemData))
};