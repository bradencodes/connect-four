import { combineReducers } from 'redux';

const initialState = {
    username: null,
    room: null,
    loading: true
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {

        case "SET_USER":
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        
        default:
            return state;
    }
}

export default combineReducers({
    user: userReducer
})