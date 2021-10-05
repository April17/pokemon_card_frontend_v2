
const defaultState = {
    currency: "USD",
    payee: {
      firstName: "",
      lastName: ""
    },
    "shipping_address": {
      streetAddress:"",
      apt: "",
      city: "",
      state: "",
      zipCode: ""
    }
  }
  
  export const payPalReducers = (state = defaultState, action) => {
    switch (action.type) {
      case 'SHIPPING_DATA':
        return {...state, payee: action.payload.payee, "shipping_address": action.payload.shippingData}
      default:
        return state
    }
  }