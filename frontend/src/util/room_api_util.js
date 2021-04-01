import axios from 'axios';

export const createRoom = data => {
  console.log(data)
  return axios.post('/api/rooms/new', data)
}

export const showRoom = id => {
  return axios.get(`/api/rooms/${id}`)
}

export const getUserRooms = id => {
  console.log("room API");
  return axios.get(`/api/rooms/user/${id}`)
}