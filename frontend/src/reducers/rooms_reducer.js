import {RECEIVE_NEW_ROOM, RECEIVE_ROOMS } from "../actions/room_actions";

const RoomsReducer = (state= {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NEW_ROOM:
            return Object.assign({}, state, {[action.room._id]: action.room})
        case RECEIVE_ROOMS:
            let roomsObj = {}
            action.rooms.forEach(room => {
                roomsObj[room._id] = room
            });
            const newState = Object.assign( {}, state, roomsObj);
            console.log("rooms reduc");
            console.log(newState);
            return newState;
        default:
            return state;
    }
}

export default RoomsReducer;