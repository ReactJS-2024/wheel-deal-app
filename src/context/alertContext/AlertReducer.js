const alertReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_ALERT':
            return {
                ...state,
                message: action.payload.message,
                variant: action.payload.variant,
                isAlert: true
            }
        case 'HIDE_ALERT': 
            return {
                ...state,
                message: '',
                variant: '',
                isAlert: false
            }
        default:
            return state;
    }
}

export default alertReducer;