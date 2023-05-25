

import { applyMiddleware, combineReducers, createStore } from 'redux';
import toDoReducer from './reducers/toDoReducer';
import  thunk  from 'redux-thunk';
const allReducer = combineReducers({toDoReducer})
const store =createStore(allReducer,applyMiddleware(thunk))
export default store