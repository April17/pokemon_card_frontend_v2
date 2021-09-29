import { API_ROOT } from '../../assets/API_Route';
import { actions } from "../actions/cartActions";
import { logOut } from '../../utility/utility';


export const editCart = (cartData) => dispatch => {
  const stringify = JSON.stringify(cartData)
  localStorage.cart = stringify
  dispatch(actions.editCart(cartData))
  if(localStorage.token){
    const config = {
      method: 'post',
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
        console.log(JSON.parse(data.response.body))
    })
    .catch(error => {
      logOut()
      dispatch(actions.auth(false))
      console.log("Error: ", error)
      
    })
  }
};