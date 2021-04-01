
import { RECEIVE_FRIENDSHIP, RECEIVE_FRIENDSHIPS } from '../actions/friendship_actions'

const friendshipReducer = (state = {} , action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_FRIENDSHIPS:
            return Object.assign({}, action.friendships)

        case RECEIVE_FRIENDSHIP:
            nextState[action.friendship.id] = action.friendship
            return nextState

        default:
            return state
    }
}

export default friendshipReducer