import { API_ROOT, HEADERS } from '../../assets/API_Route';
import { actions } from "../actions/currentUserActions";


export const logIn = logInData => dispatch => {
    const config = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(logInData)
    }
    return fetch(`${API_ROOT}/login`, config)
        .then(rsp => rsp.json())
        .then(data => {
            console.log(data)
            if(data.token){
                localStorage.token = data.token
                dispatch(actions.loginSuccess(data.userId))
            } else {
                dispatch(actions.loginFail(data.userId))
            }
        })
        .catch(error => {
            console.log("Error: ", error)
        })
};


export const signUp = signUpData => dispatch => {
    const config = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(signUpData)
    }
    return fetch(`${API_ROOT}/signup`, config)
        .then(rsp => rsp.json())
        .then(data => {
            // localStorage.token = data.token
            console.log(data)
            // dispatch(actions.loginSuccess())
        })
        .catch(error => {
            console.log(error)
        })
};