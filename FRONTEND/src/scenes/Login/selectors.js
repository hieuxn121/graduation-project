import {createSelector} from 'reselect'
import { initialState } from './reducer'

const selectState = (state) => state.loginRoot || initialState

const makeSelectUsers = () => createSelector(selectState, substate => substate.users)
const makeSelectComplete = () => createSelector(selectState, substate => substate.complete)

export {
   makeSelectUsers,
   makeSelectComplete,
}
