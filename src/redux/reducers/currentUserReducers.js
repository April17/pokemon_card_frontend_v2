const defaultState = {
    userData: {
      userId: "",
      nickName: "",
      accountType: "",
      orders: "[]",
      decklist: "[]"
    },
    errorState: false,
    auth: false
  }
  
  export const currentUserReducers = (state = defaultState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {...state, userId: {userId: action.payload}, errorState:false}
      case 'LOGIN_FAIL':
        return {...state, errorState: true}
      case 'GET_PROFILE':
        return {...state, userData: action.payload}
      case 'AUTH':
        console.log("authReducer: ", action.payload)
        return {...state, auth: action.payload}
      default:
        return state
    }
  }