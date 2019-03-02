const initialState = {
    user_id: null,
    loading: true
}

export default userReducer = (state = initialState, action) => {
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