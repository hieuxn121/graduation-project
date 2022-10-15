import { actionTypes } from "./constants";

export const initialState = {
  listProducts: [],
  loading: true,
  limitProds: '',
  categories: [],
  numberProds: 0,
  checkCourseCode: false,
  courseDetail: {},
  lessons: [{}],
  listMyCourse: [{}],
}

const calNumberProds = (data) => {
  let value = 0;
  for (let i = 0; i < data.length; i++) {
    value++
  }
  return value;
}
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_PRODUCTS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_LIST_PRODUCTS_SUCCESS:
      return {
        ...state,
        listProducts: [...action.payload.data.course],
        loading: false,
        numberProds: calNumberProds(action.payload.data.course)
      }
    case actionTypes.GET_LIST_CATEGORY_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_LIST_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...action.payload.data.data],
        loading: false
      }
    case actionTypes.GET_LIST_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        categories: [{ name: "No Authorization" }]
      }
    case actionTypes.GET_PRODUCT_SEARCHED_START:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_PRODUCT_SEARCHED_SUCCESS:
      return {
        ...state,
        loading: false,
        listProducts: [...action.payload.data]
      }
    case actionTypes.CHECK_COURSE_CODE_SUCCESS:
      return {
        ...state,
        checkCourseCode: true,
        courseDetail: action.payload.data.course
      }
    case actionTypes.CHECK_COURSE_CODE_FAIL:
      return {
        ...state,
        checkCourseCode: false
      }
    case actionTypes.GET_LIST_LESSON_SUCCESS:
      return {
        ...state,
        checkCourseCode: true,
        lessons: action.payload.data.lessons
      }
    case actionTypes.GET_LIST_LESSON_FAIL:
      return {
        ...state,
      }
    case actionTypes.GET_LIST_MY_COURSE_SUCCESS:
      return {
        ...state,
        listMyCourse: action.payload.data.course
      }
    case actionTypes.GET_LIST_MY_COURSE_FAIL:
      return {
        ...state,
      }
    default:
      return {
        ...state
      }

  }
}
export default productReducer;