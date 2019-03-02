import { combineReducers } from 'redux';
import { userReducer } from './userReducer.js';
import { gameReducer } from './gameReducer.js';

export default combineReducers({
    userReducer,
    gameReducer
})