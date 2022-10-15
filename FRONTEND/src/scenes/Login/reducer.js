import {actionTypes} from './constants'

export const initialState = {
    user: {
        first_name: '',  
        last_name: '',
        email: '',
        phone:'',
        address:'',
    },
    users: [],
    token: "",
    complete: false
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_NEW_ACC_START: {
            return {
                ...state
            }
        }
        case actionTypes.CREATE_NEW_ACC_SUCCESS: {
            return {
                ...state
            }
        }
        case actionTypes.GET_USER_START: {
            return {
                ...state
            }
        }
        case actionTypes.GET_USER_SUCCESS: {
            return {
                ...state,
                users: [...action.payload.data]
            }
        }
        case actionTypes.LOGIN_START: {
            return {
                ...state
            }
        }
        case actionTypes.LOGIN_SUCCESS: {
            if(action.payload.token !== '' && action.payload.data.token){
                
                localStorage.setItem("token", action.payload.data.token)
            }
            return {
                ...state,
                user: action.payload.data.user,
                complete: true
            }
        }
        case actionTypes.LOGIN_FAIL: {
            return {
                ...state
            }
        }
        default:
            return {
                ...state
            }
    }
}
export default loginReducer