import ActionTypes from "./statsActionTypes";

const statsReducer = (state, action) => {
    switch(action.type) {
        case ActionTypes.SET_USER_STATS:
            return {
                ...state,
                statsData: action.payload
            }
        case ActionTypes.SET_EMPTY_USER_STATS:
            return {
                ...state,
                statsData: null
            }
        default:
            return state;
    }
}

export default statsReducer;