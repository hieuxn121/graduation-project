import {createSelector} from 'reselect'
import { initialState } from './reducer'

const selectState = (state) => state.teachersRoot || initialState

const makeSelectListTeachers = () => createSelector(selectState, substate => substate.listTeachers)
const makeSelectLoading = () => createSelector(selectState, substate => substate.loading);

export {
    makeSelectListTeachers,
    makeSelectLoading,
}