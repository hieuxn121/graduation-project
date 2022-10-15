import {
    useInjectReducer as useReducer,
    useInjectSaga as useSaga,
} from 'redux-injectors';

const useInjectReducer = (key, reducer) => useReducer({ key, reducer });
const useInjectSaga = (key, saga) => useSaga({ key, saga });

export { useInjectReducer, useInjectSaga };