import axios from 'axios';

export const fetchFriendships = (friend_id) => {
    return axios.get(`/api/friendships/${friend_id}`)
}

export const createFriendship = (friendship) =>{
    return axios.post('/api/friendships/',friendship)
}