export const actions = {
    loginSuccess: (userId) => ({ type: "LOGIN_SUCCESS", payload: userId }),
    loginFail: () => ({type: "LOGIN_FAIL"}),
    getProfileAction: (userData) => ({ type: "GET_PROFILE", payload: userData }),
    auth: (authData) => ({type: "AUTH", payload: authData}), 
    resrtProfileAction: () => ({type: "RESET_PROFILE"}), 
  };