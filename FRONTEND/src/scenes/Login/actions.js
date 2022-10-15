import {actionTypes} from './constants'

export const createAccStart = (input) => ({
    type: actionTypes.CREATE_NEW_ACC_START,
    payload: input
})
export const createAccSuccess = (output) => ({
    type: actionTypes.CREATE_NEW_ACC_SUCCESS,
    payload: output
})
export const createAccFail = () => ({
    type: actionTypes.CREATE_NEW_ACC_FAIL
})

export const getUserStart = () => ({
    type: actionTypes.GET_USER_START
})
export  const getUserSuccess = (output)=> ({
    type: actionTypes.GET_USER_SUCCESS,
    payload: output
})
export const getUserFail = () => ({
    type: actionTypes.GET_USER_FAIL
})
export const loginStart = (input) => ({
    type: actionTypes.LOGIN_START,
    payload: {...input}
})
export const loginSuccess = (output) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: output
})
export const loginFail = () => ({
    type: actionTypes.LOGIN_FAIL
})