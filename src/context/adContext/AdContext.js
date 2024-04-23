import { createContext, useReducer } from "react";
import adReducer from "./AdReducer";

const AdContext = createContext();

export const AdProvider = ({children}) => {
  
   const initState = {
       allAds: [],
       adsForUser: []
   }

   const [state, dispatch] = useReducer(adReducer, initState);

   return <AdContext.Provider value={{
           ...state,
           dispatch
       }}>
         {children}
   </AdContext.Provider>
}


export default AdContext;