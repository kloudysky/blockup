import { RECEIVE_NEW_ROOM, RECEIVE_ROOMS, RECEIVE_SINGLE_ROOM } from "../actions/room_actions";

const RoomsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NEW_ROOM:
      return Object.assign({}, state, { [action.room._id]: action.room });
    case RECEIVE_ROOMS:
      let roomsObj = {};
      action.rooms.forEach((room) => {

        roomsObj[room._id] = room;
      });
      const newState = Object.assign({}, state, roomsObj);
      return newState;
    case RECEIVE_SINGLE_ROOM:
        return action.room;
    default:
      return state;
  }
};

export default RoomsReducer;
