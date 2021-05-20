import { connect } from "react-redux";
import { composeRoom, deleteUserRoom, fetchUserRooms } from "../../actions/room_actions";
import { fetchActiveRoom } from "../../actions/ui_actions";
import {
  receiveMessage,
  fetchRoomMessages,
  receiveRoomMessage,
} from "../../actions/message_actions";
import SideRoomIndex from "./side_room_index";
import { fetchFriendships } from "../../actions/friendship_actions";

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    errors: state.errors.session,
    rooms: Object.values(state.rooms),
    activeRoom: state.ui.activeRoom,
    friends: state.session.user.friends,
    messags: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRooms: (id) => dispatch(fetchUserRooms(id)),
    setActiveRoom: (id) => dispatch(fetchActiveRoom(id)),
    fetchRoomMessages: (roomId) => dispatch(fetchRoomMessages(roomId)),
    receiveRoomMessage: (message) => dispatch(receiveRoomMessage(message)),
    fetchMessage: (msg) => dispatch(receiveMessage(msg)),
    fetchFriends: (id) => dispatch(fetchFriendships(id)),
    createRoom: (room) => dispatch(composeRoom(room)),
    destroyRoom: (id) => dispatch(deleteUserRoom(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideRoomIndex);
