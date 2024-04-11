import { createContext, useEffect, useReducer } from "react";
import authReducer from "./AuthReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../fbConfig";
import ActionTypes from "./authActionTypes";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const initState = {
        user: {},
        isAuthenticated: false
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: user
            });
        });
        return () => unsubscribe();
    }, []);

    const [state, dispatch] = useReducer(authReducer, initState);

    return <AuthContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;