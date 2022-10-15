import { actionTypes } from "./constants"
export const getListTeachersStart = () => ({
    type: actionTypes.GET_LIST_TEACHERS_START,
})
export const getListTeachersSuccess = (output) => ({
    type: actionTypes.GET_LIST_TEACHERS_SUCCESS,
    payload: output
})
export const getListTeachersFail = () => ({
    type: actionTypes.GET_LIST_TEACHERS_FAIL
})
