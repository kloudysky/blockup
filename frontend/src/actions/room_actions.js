import { createRoom } from "../util/room_api_util";

export const RECEIVE_NEW_ROOM = "RECEIVE_NEW_ROOM";

export const receiveNewRoom = room => ({
    type: RECEIVE_NEW_ROOM,
    room
})

export const composeRoom = data => dispatch => (
    createRoom(data)
        .then(room = > dispatch(receiveNewRoom(room)))
        .catch(err => console.log(err))
);