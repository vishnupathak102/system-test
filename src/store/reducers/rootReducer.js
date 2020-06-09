
import {combineReducers} from 'redux';
import ToDoListReducer from './ToDoListReducer';

const rootReducer = combineReducers({
    list:ToDoListReducer
})

export default rootReducer;