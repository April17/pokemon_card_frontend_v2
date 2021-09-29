export const actions = {
    loginSuccess: (userId) => ({ type: "LOGIN_SUCCESS", payload: userId }),
    loginFail: () => ({type: "LOGIN_FAIL"}),
    auth: (authData) => ({type: "AUTH", payload: authData})
  };