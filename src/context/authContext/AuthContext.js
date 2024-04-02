import { createContext, useReducer } from "react";
import authReducer from "./AuthReducer";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const initState = {
        user: {},
        isAuthenticated: false
    }

    const [state, dispatch] = useReducer(authReducer, initState);

    return <AuthContext.Provider value={{
        ...state,
        dispatch
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;