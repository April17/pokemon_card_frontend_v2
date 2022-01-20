import { API_ROOT, HEADERS } from '../../assets/API_Route';
import { actions } from "../actions/currentUserActions";
import { logOut  } from '../../utility/utility';


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
};

export const getProfileAdapter = () => dispatch => {
    if(localStorage.token){
        const config = {
            method: 'GET',
            headers: {
                Authorization: localStorage.token
            }
        }
        fetch(`${API_ROOT}/profile`, config)
            .then(rsp => rsp.json())
            .then(data => {
                console.log(data)
                dispatch(actions.getProfileAction(data.response))
            })
            .catch(error => {
                logOut()
                dispatch(actions.auth(false))
                console.log("Error: ", error)
            })
    }
}

export const auth = () => dispatch => {
    if(localStorage.token){
        const config = {
            method: 'GET',
            headers: {
                Authorization: localStorage.token
            }
        }
        fetch(`${API_ROOT}/auth`, config)
            .then(rsp => { console.log(rsp); rsp.json()})
            .then(data => {
                console.log(data)
                dispatch(actions.auth(data.response.auth))
            })
            .catch(error => {
                logOut()
                dispatch(actions.auth(false))
                console.log("Error: ", error)
            })
    }

}

export const resetProfileAdapter = () => dispatch => {
    dispatch(actions.resrtProfileAction())
}