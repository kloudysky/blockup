import {RECEIVE_NEW_ROOM, RECEIVE_ROOMS } from "../actions/room_actions";
    const state = {
        rooms: {},
        new: null
    }

const RoomsReducer = (state= {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_NEW_ROOM:
            newState.new = action.room
            return newState;
        case RECEIVE_ROOMS:
            newState.rooms = action.rooms
            return newState
        default:
            return state;
    }
}

export default RoomsReducer;