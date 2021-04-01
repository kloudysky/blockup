import {RECEIVE_NEW_ROOM, RECEIVE_ROOMS } from "../actions/room_actions";

const RoomsReducer = (state= {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NEW_ROOM:
            return Object.assign({}, state, {[action.room._id]: action.room})
        case RECEIVE_ROOMS:
            debugger;
            return Object.assign( {}, state, action.rooms)
        default:
            return state;
    }
}

export default RoomsReducer;