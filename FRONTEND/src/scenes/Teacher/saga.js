import { takeLatest, call, race, put } from "@redux-saga/core/effects";
import { actionTypes } from "./constants";
import {
    getListTeachersSuccess,
    getListTeachersFail,
}
from './actions'
import service from './services'
export default function* watchProductAction(){
    yield takeLatest(
        actionTypes.GET_LIST_TEACHERS_START,
        getListTeachers
    )
}

function* getListTeachers(){
    try {
        const {output} = yield race({
            output: call(service.getListTeachers)
        })
        if(output){
            yield put(getListTeachersSuccess(output))
        }
        else{
            yield put(getListTeachersFail())
        }
    } catch (error) {
        yield put(getListTeachersFail())
    }
}
