import { createContext, useReducer } from "react";
import profileReducer from "./ProfileReducer";

const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  
   const initState = {
       user: {}
   }

   const [state, dispatch] = useReducer(profileReducer, initState);

   return <ProfileContext.Provider value={{
           ...state,
           dispatch
       }}>
         {children}
   </ProfileContext.Provider>
}


export default ProfileContext;