import { API_ROOT } from '../../assets/API_Route';
import { actions } from "../actions/cartActions";
import { actions as userActions } from "../actions/currentUserActions";
import { logOut } from '../../utility/utility';


export const editCart = (cartData) => dispatch => {
  const stringify = JSON.stringify(cartData)
  localStorage.cart = stringify
  // console.log(stringify)
  dispatch(actions.editCart(cartData))
  if(localStorage.token){
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: localStorage.token
      },
      body: stringify
    }
    fetch(`${API_ROOT}/cart`, config)
    .then(rsp => rsp.json())
    .then(data => {
        // console.log(JSON.parse(data.response.body))
    })
    .catch(error => {
      logOut()
      dispatch(userActions.auth(false))
      console.log("Error: ", error)
    })
  }
};

export const getCart = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: localStorage.token
    }
  }
  fetch(`${API_ROOT}/getcart`, config)
  .then(rsp => rsp.json())
  .then(data => {
    localStorage.cart = data.response.cart
    dispatch(actions.getCart(JSON.parse(data.response.cart)))
  })
  .catch(error => {
    logOut()
    dispatch(userActions.auth(false))
    console.log("Error: ", error)
  })
}