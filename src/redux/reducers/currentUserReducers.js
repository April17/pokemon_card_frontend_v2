const defaultState = {
    userId: "",
    errorState: false,
    auth: false
  }
  
  export const currentUserReducers = (state = defaultState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {...state, userId: action.payload, errorState:false}
      case 'LOGIN_FAIL':
        return {...state, errorState: true}
      case 'AUTH':
        console.log("authReducer: ", action.payload)
        return {...state, auth: action.payload}
      default:
        return state
    }
  }