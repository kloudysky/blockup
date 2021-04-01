import { RECEIVE_ACTIVE_ROOM } from "../actions/ui_actions";

const UiReducer = (state = {activeRoom: -1}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ACTIVE_ROOM:
      return Object.assign({}, state, { activeRoom: action.room } );
    default:
      return state;
  }
};

export default UiReducer;
