import ActionTypes from "./adActionTypes";

const adReducer = (state, action) => {
   switch(action.type) {
       case ActionTypes.SET_ALL_ADS:
           return {
               ...state,
               allAds: action.payload,
           }
       case ActionTypes.GET_ALL_ADS:
           return {
               ...state
           }
       default:
           return state;
   }
}

export default adReducer;