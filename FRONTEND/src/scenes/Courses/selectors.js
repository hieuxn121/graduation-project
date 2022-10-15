import {createSelector} from 'reselect'
import { initialState } from './reducer'

const selectState = (state) => state.coursesRoot || initialState

const makeSelectListCourses = () => createSelector(selectState, substate => substate.listProducts)
const makeSelectCourseDetail = () => createSelector(selectState, substate => substate.courseDetail)
const makeSelectCheckCourse = () => createSelector(selectState, substate => substate.checkCourseCode)
const makeSelectLoading = () => createSelector(selectState, substate => substate.loading);
const makeSelectorLimitProds = () => createSelector(selectState, substate => substate.limitProds)
const makeSelectCategories = () => createSelector(selectState, substate => substate.categories)
const makeSelectSubject = () => createSelector(selectState, substate => substate.categories.map(e => e.cate_name))
const makeSelectNumberProds = () => createSelector(selectState, substate => substate.numberProds)
const makeSelectProdChoosen = () => createSelector(selectState, substate => substate.prodChoosen)
const makeSelectLessons = () => createSelector(selectState, substate => substate.lessons);
const makeSelectListMyCourse = () => createSelector(selectState, substate => substate.listMyCourse);

export {
    makeSelectListCourses,
    makeSelectLoading,
    makeSelectorLimitProds,
    makeSelectCategories,
    makeSelectNumberProds,
    makeSelectProdChoosen,
    makeSelectSubject,
    makeSelectCourseDetail,
    makeSelectCheckCourse,
    makeSelectLessons,
    makeSelectListMyCourse
}