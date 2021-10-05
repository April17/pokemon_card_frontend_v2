// import { actions } from "../actions/payPalActions";
import { API_ROOT, HEADERS } from '../../assets/API_Route';

export const checkoutAdapter = (items, shippingData, paymentData) => dispatch => {
    let checkoutData = {
        items: items,
        paypalData: {
            paymentData: paymentData,
            shippingData: shippingData
        }
    }
    // console.log("checkoutData: ", checkoutData)
    const config = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(checkoutData)
    }
    return fetch(`${API_ROOT}/order`, config)
        .then(rsp => rsp.json())
        .then(data => {
            console.log(JSON.parse(data.response.body))
            
            // if(data.token){
            //     localStorage.token = data.token
            //     dispatch(actions.loginSuccess(data.userId))
            // } else {
            //     dispatch(actions.loginFail(data.userId))
            // }
        })
        .catch(error => {
            console.log("Error: ", error)
        })

}