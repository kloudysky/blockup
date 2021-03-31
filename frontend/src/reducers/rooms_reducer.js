import {RECEIVE_NEW_ROOM, RECEIVE_ROOMS } from "../actions/room_actions";
    // const state = {
    //     rooms: {},
    //     new: null
    // }

const RoomsReducer = (state= {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_NEW_ROOM:
            // newState.new = action.room
            // return newState;
            return Object.assign({}, state, {[action.room.id]: action.room})
        case RECEIVE_ROOMS:
            return Object.assign( {}, state, action.rooms)
        default:
            return state;
    }
}

export default RoomsReducer;