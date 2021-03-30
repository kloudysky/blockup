import axios from 'axios';

// export const getRooms = () => { dont need to get all the rooms
//   return axios.get('/api/rooms')
// };

// export const getUserrooms = id => {
//   return axios.get(`/api/rooms/user/${id}`)
// };

export const createRoom = data => {
  return axios.post('/api/rooms/new', data)
}