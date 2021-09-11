import {actions} from '../actions/utilityActions'



export const logInFromState = (formName) => dispatch => {
    dispatch(actions.logInFrom(formName))
}