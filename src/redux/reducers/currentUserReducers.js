const defaultState = {
    userId: "",
    errorState: false
  }
  
  export const currentUserReducers = (state = defaultState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {userId: action.payload, errorState:false}
      case 'LOGIN_FAIL':
        return {errorState: true}
      default:
        return state
    }
  }