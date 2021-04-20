import { connect } from "react-redux";
import { composeRoom, fetchUserRooms } from "../../actions/room_actions";
import { fetchActiveRoom } from "../../actions/ui_actions";
import { receiveMessage } from "../../actions/message_actions";
import SideRoomIndex from "./side_room_index";
import { fetchFriendships } from "../../util/friendship_api_util";

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    errors: state.errors.session,
    rooms: Object.values(state.rooms),
    activeRoom: state.ui.activeRoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRooms: (id) => dispatch(fetchUserRooms(id)),
    setActiveRoom: (id) => dispatch(fetchActiveRoom(id)),
    fetchMessage: (msg) => dispatch(receiveMessage(msg)),
    fetchFriends: (currentUserId) => dispatch(fetchFriendships(currentUserId)),
    createRoom: (room) => dispatch(composeRoom(room))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideRoomIndex);
