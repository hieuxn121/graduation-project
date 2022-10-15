import {actionTypes} from './constants'
export const initialState = {
    carts: [],
    loading: true
};
const globalReducer = (state = initialState) => {
   return state;
}
export default globalReducer;