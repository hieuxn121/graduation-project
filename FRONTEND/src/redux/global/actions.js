import {actionTypes} from './constants'
export const putProductInCart = (input) => ({
    type: actionTypes.PUT_PRODUCTS_IN_CART,
    payload: input
})
export const deleteProductInCart = () => ({
    type: actionTypes.DELETE_PRODUCTS_IN_CART
})