import { actions } from "../actions/orderActions";
import { API_ROOT, HEADERS } from '../../assets/API_Route';

export const orderAdapters = (items, shippingData, paymentData) => dispatch => {
    let checkoutData = {
        items: items,
        paypalData: {
            paymentData: paymentData,
            shippingData: shippingData
        }
    }
    console.log("checkoutData: ", checkoutData)
    const config = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(checkoutData)
    }
    return fetch(`${API_ROOT}/order`, config)
        .then(rsp => rsp.json())
}


export const orderSuccess = (orderId) => dispatch => {
    dispatch(actions.orderSuccess(orderId))
}

export const getOrders = (orderIds) => dispatch => {
    console.log(orderIds)
    const config = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({orderIds: orderIds})
    }
    return fetch(`${API_ROOT}/getorder`, config)
        .then(rsp => rsp.json())
        .then(data => {
            console.log(data.response)
            if(data.response.orders.length === 1){
                dispatch(actions.getOrder(data.response.orders[0]))
            } else {
                console.log("for Profile Page")
            }
        })
}