const defaultState = {
    formState:"logIn"
}
  
export const utilityReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_FORM':
            return {formState: action.payload}
        default:
            return state
    }
}