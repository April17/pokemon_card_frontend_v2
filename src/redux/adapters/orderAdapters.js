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
    let config = {}
    
    if(localStorage.token){
        config = {
            method: 'POST',
            headers: {
                Authorization: localStorage.token
            },
            body: JSON.stringify(checkoutData)
        }
    } else {
        config = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(checkoutData)
        }
    }
    return fetch(`${API_ROOT}/order`, config)
        .then(rsp => rsp.json())
}


export const orderSuccess = (orderId) => dispatch => {
    dispatch(actions.orderSuccess(orderId))
}

export const getOrders = (orderIds) => dispatch => {
    const config = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({orderIds: orderIds})
    }
    return fetch(`${API_ROOT}/getorder`, config)
        .then(rsp => rsp.json())
        .then(data => {
            if(data.response.orders.length === 1){
                dispatch(actions.getOrder(data.response.orders[0]))
            } else if(data.response.orders.length > 1) {
                console.log("for Profile Page")
            } else {
                dispatch(actions.noOrderFound())
            }
        })
}