
const defaultState = {
    orderId: "",
    createdTime: "",
    status: "",
    firstName: "",
    lastName: "",
    email: "",
    shippingAddress: "",
    items: "",
    recordFound: false
}
  
  export const orderReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'ORDER_SUCCESS':
            return {...state, orderId: action.payload}
        case 'GET_ORDER':
            return {...action.payload, recordFound: true}
        case 'NO_ORDER_FOUND':
            return {...state,orderId:"No Order Found", recordFound: false}
        default:
            return state
    }
  }