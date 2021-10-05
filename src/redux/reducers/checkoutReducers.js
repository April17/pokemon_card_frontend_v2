const defaultState = {
    items:[],
    paypalData:{}
  }
  
  export const payPalReducers = (state = defaultState, action) => {
    switch (action.type) {
      case 'CHECKOUT':
        return {...state, items: action.payload.items, paypalData: action.payload.paypalData}
      default:
        return state
    }
  }