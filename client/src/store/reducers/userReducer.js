import { FINDING_USER, FOUND_USER, CREATING_USER, CREATED_USER, ERROR } from '../actions/userActions.js';

const initialState = {
    creatingUser: false,
    findingUser: false,
    userID: null,
    error: null
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {

        case CREATING_USER:
            return Object.assign({}, state, {
                creatingUser: action.payload
            })

        case CREATED_USER:
            return Object.assign({}, state, {
                creatingUser: false,
                error: null,
                userID: action.payload
            })

        case FINDING_USER:
            return Object.assign({}, state, {
                findingUser: action.payload
            })

        case FOUND_USER:
            return Object.assign({}, state, {
                findingUser: false,
                userID: action.payload
            })

        case ERROR:
            return Object.assign({}, state, {
                error: action.payload
            })
        
        default:
            return state;
    }
}