
const defaultState = {
    orderId: "",
    createdTime: "",
    status: "",
    firstName: "",
    lastName: "",
    email: "",
    shippingAddress: "",
    items: ""
}
  
  export const orderReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'ORDER_SUCCESS':
            return {...state, orderId: action.payload}
        case 'GET_ORDER':
            return {...action.payload}
        default:
            return state
    }
  }