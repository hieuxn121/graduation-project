import { combineReducers } from 'redux';

import globalReducer from './global/reducer';

export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        global: globalReducer,
        ...injectedReducers
    });

    return rootReducer;
}