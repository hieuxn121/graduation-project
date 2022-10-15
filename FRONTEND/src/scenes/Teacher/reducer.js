import { actionTypes } from "./constants";

export const initialState = {
    listTeachers: [],
    loading: true,
}

const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIST_TEACHERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_LIST_TEACHERS_SUCCESS:
            return {
                ...state,
                listTeachers: [...action.payload.data.data],
                loading: false,
            }
        case actionTypes.GET_LIST_TEACHERS_FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return {
                ...state
            }

    }
}
export default teacherReducer;