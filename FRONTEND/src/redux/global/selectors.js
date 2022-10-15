import {createSelector} from 'reselect'
import { initialState } from './reducer'

const selectState = (state) => state.global || initialState

const makeSelectProdInCart = () => createSelector(selectState, substate => substate.prodInCart)
const makeSelectLoading = () => createSelector(selectState, substate => substate.loading);
const makeSubtotalPrice = () => createSelector(makeSelectProdInCart, 
        substate => substate)
export {
    makeSelectProdInCart,
    makeSelectLoading,
    makeSubtotalPrice
}