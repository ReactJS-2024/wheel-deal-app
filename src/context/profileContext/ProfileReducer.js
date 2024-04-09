import ActionTypes from "./profileActionTypes";

const profileReducer = (state, action) => {
   switch(action.type) {
       case ActionTypes.SET_USER_DATA:
           return {
               ...state,
               user: action.payload
           }
       default:
           return state;
   }
}


export default profileReducer;