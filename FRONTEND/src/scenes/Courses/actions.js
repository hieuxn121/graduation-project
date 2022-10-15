import { actionTypes } from "./constants"
export const getListCoursesStart = (input) => ({
    type: actionTypes.GET_LIST_PRODUCTS_START,
    payload: input
})
export const getListProductsSuccess = (output) => ({
    type: actionTypes.GET_LIST_PRODUCTS_SUCCESS,
    payload: output
})
export const getListProductsFail = () => ({
    type: actionTypes.GET_LIST_PRODUCTS_FAIL
})
export const getListCatStart = () => ({
    type: actionTypes.GET_LIST_CATEGORY_START
})
export const getListCatSuccess = (output) => ({
    type: actionTypes.GET_LIST_CATEGORY_SUCCESS,
    payload: output 
})
export const getListCatFail = () => ({
    type: actionTypes.GET_LIST_CATEGORY_FAIL 
})
export const getDetailProdStart = (input) => ({
    type: actionTypes.GET_DETAIL_PRODUCT_START,
    payload: input
}) 
export const getDetailProdSuccess = (output) => ({
    type: actionTypes.GET_DEATAIL_PRODUCT_SUCCESS,
    payload: output
})
export const getDetailProdFail = () => ({
    type: actionTypes.GET_DETAIL_PRODUCT_FAIL
})
export const getProductSearchedStart = (input) => ({
    type: actionTypes.GET_PRODUCT_SEARCHED_START,
    payload: input
})
export const getProductSearchedSuccess = (output) => ({
    type: actionTypes.GET_PRODUCT_SEARCHED_SUCCESS,
    payload: output
})
export const getProductSearchedFailed = () => ({
    type: actionTypes.GET_PRODUCT_SEARCHED_FAIL
})
export const checkCourseCodeStart = (input) => ({
    type: actionTypes.CHECK_COURSE_CODE_START,
    payload: input
})
export const checkCourseCodeSuccess = (output) => ({
    type: actionTypes.CHECK_COURSE_CODE_SUCCESS,
    payload: output
})
export const checkCourseCodeFail = () => ({
    type: actionTypes.CHECK_COURSE_CODE_FAIL
})
export const getListLessonStart = (input) => ({
    type: actionTypes.GET_LIST_LESSON_START,
    payload: input
})
export const getListLessonSuccess = (output) => ({
    type: actionTypes.GET_LIST_LESSON_SUCCESS,
    payload: output
})
export const getListLessonFail = () => ({
    type: actionTypes.GET_LIST_LESSON_FAIL
})
export const getListMyCourseStart = (input) => ({
    type: actionTypes.GET_LIST_MY_COURSE_START,
    payload: input
})
export const getListMyCourseSuccess = (output) => ({
    type: actionTypes.GET_LIST_MY_COURSE_SUCCESS,
    payload: output
})
export const getListMyCourseFail = () => ({
    type: actionTypes.GET_LIST_MY_COURSE_FAIL
})

