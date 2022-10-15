import { takeLatest, call, race, put } from "@redux-saga/core/effects";
import { actionTypes } from "./constants";
import {
   createAccSuccess,
   createAccFail,
   getUserSuccess,
   getUserFail,
   loginSuccess,
   loginFail
}
from './actions'
import service from './services'
export default function* watchLoginAction(){
    yield takeLatest(
        actionTypes.CREATE_NEW_ACC_START,
        createNewUser
    )
    yield takeLatest(
        actionTypes.GET_USER_START,
        getUsers
    )
    yield takeLatest(
        actionTypes.LOGIN_START,
        loginAcc
    )
}

function* createNewUser(input){
    try {
        const {output} = yield race({
            output: call(service.createNewUser, input.payload)
        })
        if(output){
            console.log(output)
            yield put(createAccSuccess(output))
        }
        else{
            yield put(createAccFail())
        }
    } catch (error) {
        yield put(createAccFail())
    }
}
function* getUsers(){
    try {
        const {output} = yield race({
            output: call(service.getUsers)
        })
        if(output){
            yield put(getUserSuccess(output))
        }
        else{
            yield put(getUserFail())
        }
    } catch (error) {
        yield put(getUserFail())
    }
}
function* loginAcc(input){
    try {
        const {output} = yield race({
            output: call(service.loginAcc,input.payload)
        })
        if(output){
            yield put(loginSuccess(output))
        }
        else{
            yield put(loginFail())
        }
    } catch (error) {
        yield put(loginFail())
    }
}
