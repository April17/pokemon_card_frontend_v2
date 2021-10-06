
const defaultState = {
    currency: "USD",
    payer: {
      firstName: "",
      lastName: ""
    },
    shippingAddress: {
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
        return {...state, payer: action.payload.payer, shippingAddress: action.payload.shippingData}
      default:
        return state
    }
  }