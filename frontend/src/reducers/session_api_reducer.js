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
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        isVerified: action.currentUser.verified,
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
