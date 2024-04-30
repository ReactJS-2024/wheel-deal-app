import { createContext, useReducer } from "react";
import { Toast } from "react-bootstrap";
import AlertReducer from "./AlertReducer";

const initState = {
    message: '',
    variant: '',
    isAlert: false
}

const AlertContext = createContext(initState);

export const AlertProvider = ({children}) => {
    const [state, dispatch] = useReducer(AlertReducer, initState);

    const showAlert = (message, variant='success') => {
        dispatch({
            type: 'SHOW_ALERT',
            payload: {
                message,
                variant
            }
        });
    }

    return (
        <AlertContext.Provider value={{...state,showAlert}}>
            {children}
            <Toast 
                onClose={() => dispatch({type: 'HIDE_ALERT'})} 
                show={state.isAlert} 
                delay={3000} 
                autohide
                bg={state.variant}
                style={{
                    position: 'fixed',
                    top: 20,
                    left: '40%',
                    textAlign: 'center'
                }}>
                    <Toast.Body>{state.message}</Toast.Body>
            </Toast>
        </AlertContext.Provider>
    )
}

export default AlertContext;