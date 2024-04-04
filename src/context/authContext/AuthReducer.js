import ActionTypes from "./authActionTypes";

const authReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER_SUCCESS:
           return {
                ...state,
                user: action.payload,
                isAuthenticated: true
           }
        case ActionTypes.REGISTER_ERROR:
            return {
                ...state,
                user: {},
                isAuthenticated: false
            }
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                user: {},
                isAuthenticated: false
            }
        case ActionTypes.LOGOUT_ERROR:
            return {
                ...state
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                user: {},
                isAuthenticated: false
            }
        default:
            return state;
    }
}

export default authReducer;