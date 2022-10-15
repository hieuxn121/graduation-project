import { takeLatest, call, race, put } from "@redux-saga/core/effects";
import { actionTypes } from "./constants";
import {
  getListProductsFail,
  getListProductsSuccess,
  getListCatFail,
  getListCatSuccess,
  getDetailProdSuccess,
  getDetailProdFail,
  checkCourseCodeSuccess,
  checkCourseCodeFail,
  getListLessonSuccess,
  getListLessonFail,
  getListMyCourseSuccess,
  getListMyCourseFail
}
  from './actions'
import service from './services'
export default function* watchProductAction() {
  yield takeLatest(
    actionTypes.GET_LIST_MY_COURSE_START,
    getListMyCourse
  )
  yield takeLatest(
    actionTypes.GET_LIST_PRODUCTS_START,
    getListProducts
  )
  yield takeLatest(
    actionTypes.GET_LIST_CATEGORY_START,
    getListCate
  )
  yield takeLatest(
    actionTypes.GET_DETAIL_PRODUCT_START,
    getDetailProd
  )
  yield takeLatest(
    actionTypes.GET_PRODUCT_SEARCHED_START,
    getListProducts
  )
  yield takeLatest(
    actionTypes.CHECK_COURSE_CODE_START,
    checkCourseCode
  )
  yield takeLatest(
    actionTypes.GET_LIST_LESSON_START,
    getListLessons
  )
}

function* getListProducts(input) {
  try {
    const { output } = yield race({
      output: call(service.getListCourses, input.payload)
    })
    if (output) {
      yield put(getListProductsSuccess(output))
    }
    else {
      yield put(getListProductsFail())
    }
  } catch (error) {
    yield put(getListProductsFail())
  }
}
function* getListCate() {
  try {
    const { output } = yield race({
      output: call(service.getListCates)
    })
    if (output) {
      yield put(getListCatSuccess(output))
    }
    else {
      yield put(getListCatFail())
    }
  } catch (error) {
    yield put(getListCatFail())
  }
}
function* getDetailProd(input) {
  try {
    const { output } = yield race({
      output: call(service.getDetailProd, input.payload)
    })
    if (output) {
      yield put(getDetailProdSuccess(output))
    }
    else {
      yield put(getDetailProdFail())
    }
  } catch (error) {
    yield put(getDetailProdFail())
  }
}

function* checkCourseCode(input) {
  try {
    const { output } = yield race({
      output: call(service.checkCourseCode, input.payload)
    })
    if (output.data.course) {
      yield put(checkCourseCodeSuccess(output))
    }
    else {
      yield put(checkCourseCodeFail())
    }
  } catch (error) {
    yield put(checkCourseCodeFail())
  }
}
function* getListLessons(input) {
  try {
    const { output } = yield race({
      output: call(service.getListLesson, input.payload)
    })
    if (output) {
      yield put(getListLessonSuccess(output))
    }
    else {
      yield put(getListLessonFail())
    }
  } catch (error) {
    yield put(getListLessonFail())
  }
}
function* getListMyCourse(input) {
  try {
    const { output } = yield race({
      output: call(service.getListMyCourse, input.payload)
    })
    if (output) {
      yield put(getListMyCourseSuccess(output))
    }
    else {
      yield put(getListMyCourseFail())
    }
  } catch (error) {
    yield put(getListMyCourseFail())
  }
}