import { createContext, useReducer } from "react";
import statsReducer from "./StatsReducer";

const StatsContext = createContext();

export const StatsProvider = ({children}) => {

    const initState = {
        statsData: {}
    }

    const [state, dispatch] = useReducer(statsReducer, initState);

    return <StatsContext.Provider value={{
            ...state,
            dispatch
        }}>
          {children}
    </StatsContext.Provider>
}

export default StatsContext;