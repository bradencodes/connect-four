const initialState = {
    game_id: null,
    winner: 'none',
    turn: null,
    col1: [],
    col2: [],
    col3: [],
    col4: [],
    col5: [],
    col6: [],
    col7: []
}

export default gameReducer = (state = initialState, action) => {
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