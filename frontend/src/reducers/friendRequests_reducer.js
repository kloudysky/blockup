
import { RECEIVE_FRIEND_REQUEST, RECEIVE_FRIEND_REQUESTS} from '../actions/friendship_actions'

 const friendRequestReducer = (state = {} , action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_FRIEND_REQUESTS:
            return Object.assign({}, action.friendRequests)
    
        case RECEIVE_FRIEND_REQUEST:
            nextState[action.friendRequest.id] = action.friendRequest
            return nextState

        default:
            return state
    }
}

export default friendRequestReducer