import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
} from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  isVerified: false,
  user: {},
};

const SessionAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      console.log("SESSION API REDUCER");
      let isAuthenticated = false;
      if (Object.values(action.currentUser).length > 0) {
        isAuthenticated = true;
      }
      return {
        ...state,
        isAuthenticated: isAuthenticated,
        isVerified: action.currentUser.verified,
        //isVerified related to 2FA
        user: action.currentUser,
      };
  
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        isVerified: false,
        user: undefined,
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
      };
    default:
      return state;
  }
};

export default SessionAPIReducer;
