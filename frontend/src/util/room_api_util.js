import axios from 'axios';

// export const getRooms = () => { dont need to get all the rooms
//   return axios.get('/api/rooms')
// };

// export const getUserrooms = id => {
//   return axios.get(`/api/rooms/user/${id}`)
// };

export const createRoom = data => {
  debugger;
  return axios.post('/api/rooms/new', data)
}

export const showRoom = id => {
  return axios.get(`api/rooms/${id}`)
}

export const getUserRooms = id => {
  return axios.get(`api/rooms/user/${id}`)
}