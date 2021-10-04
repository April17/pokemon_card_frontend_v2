const defaultState = {
    total: 0
  }
  
  export const payPalReducers = (state = defaultState, action) => {
    switch (action.type) {
      case 'TOTAL':
        return {...state, total: action.payload}
      default:
        return state
    }
  }