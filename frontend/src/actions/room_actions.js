import { createRoom, getUserRooms } from "../util/room_api_util";

export const RECEIVE_NEW_ROOM = "RECEIVE_NEW_ROOM";
export const RECEIVE_ROOMS = "RECEIVE_ROOMS";

export const receiveNewRoom = room => ({
    type: RECEIVE_NEW_ROOM,
    room
})

export const receiveRooms = rooms => ({
    type: RECEIVE_ROOMS,
    rooms
})



export const composeRoom = data => dispatch => (
    createRoom(data)
        .then(room => dispatch(receiveNewRoom(room)))
        .catch(err => console.log(err))
);

export const fetchRooms = id => dispatch => (
    getUserRooms(id)
        .then(rooms => dispatch(receiveRooms(rooms)))
);