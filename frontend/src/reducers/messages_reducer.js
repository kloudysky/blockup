import { RECEIVE_MESSAGE } from "../actions/message_actions";

const MessagesReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_MESSAGE:
            return Object.assign({}, state, {[action.message.id]: action.message})
        case RECEIVE_ROOM_MESSAGES:
            let messages = {};
            action.messages.forEach(message => {
                messages[message.id] = message
            })
            return Object.assign({}, state, messages)
        default:
            return state;
    }
}

export default MessagesReducer;