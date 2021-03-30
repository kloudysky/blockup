import {RECEIVE_NEW_ROOM } from "../actions/room_actions";
    const state = {
        user: {},
        new: null
    }

const RoomsReducer = (state= {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_NEW_ROOM:
            newState.new = action.room
            return newState;
        default:
            return state;
    }
}

export default RoomsReducer;