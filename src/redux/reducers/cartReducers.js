const defaultState = {
    cart:[]
  }
  
  export const cartReducers = (state = defaultState, action) => {
    switch (action.type) {
      case 'EDIT_CART':
        return {...state, cart: [...action.payload]}
      default:
        return state
    }
  }