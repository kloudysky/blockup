
import * as FriendshipApiUtil from "./../util/friendship_api_util";

export const RECEIVE_FRIEND_REQUEST = "RECEIVE_FRIEND_REQUEST";
export const RECEIVE_FRIEND_REQUESTS = "RECEIVE_FRIEND_REQUESTS";
export const RECEIVE_FRIENDSHIP = "RECEIVE_FRIENDSHIP";
export const RECEIVE_FRIENDSHIPS = "RECEIVE_FRIENDSHIPS";

export const receiveFriendRequest = friendRequest => {
    return ({
        type: RECEIVE_FRIEND_REQUEST,
        friendRequest
    })
};

export const receiveFriendRequests = friendRequests => {
    return ({
        type: RECEIVE_FRIEND_REQUESTS,
        friendRequests
    })
};

export const receiveFriendship = friendship => {
    return ({
        type: RECEIVE_FRIENDSHIP,
        friendship
    })
};

export const receiveFriendships = friendships => {
    return ({
        type: RECEIVE_FRIENDSHIP,
        friendships
    })
};

export const fetchFriendships = friend_id => dispatch => {
    return (
        FriendshipApiUtil.fetchFriendships(friend_id).then(friendships => dispatch(receiveFriendships(friendships)))
    )
}

export const fetchFriendRequests = friend_id => dispatch => {
    return (
        FriendshipApiUtil.fetchFriendRequests(friend_id).then(friendRequests => dispatch(receiveFriendRequests(friendRequests)))
    )
}

export const createFriendship = friendship => dispatch => {
    return (
        FriendshipApiUtil.createFriendship(friendship).then(friendship => dispatch(receiveFriendship(friendship)))
    )
}

export const makeFriendRequest = friendRequest => dispatch => {
    return (
        FriendshipApiUtil.makeFriendRequest(friendRequest).then(friendship => dispatch(receiveFriendRequest(friendship)))
    )
}

