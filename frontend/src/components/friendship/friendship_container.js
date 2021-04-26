import { connect } from "react-redux";
import { fetchFriendships, fetchFriendRequests, createFriendship, makeFriendRequest, deleteFriendRequest, deleteFriendship} from "../../actions/friendship_actions";
import Friendship from "./friendship";
import {composeRoom, deleteUserRoom, fetchUserRooms} from '../../actions/room_actions';
import { fetchRoomMessages } from "../../actions/message_actions";

const mapStateToProps = (state) => {
  
  return {
    user: state.session.user,
    friendships: state.friendships,
    friendRequests: state.friendRequests
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFriendships: (id) => dispatch(fetchFriendships(id)),
    fetchFriendRequests: (id) => dispatch(fetchFriendRequests(id)),
    makeFriendRequest: (friendRequest)=> dispatch(makeFriendRequest(friendRequest)),
    createFriendship: (friendship) => dispatch(createFriendship(friendship)),
    deleteFriendship: (friendship_id) => dispatch(deleteFriendship(friendship_id)),
    deleteFriendRequest: (friendRequest_id) => dispatch(deleteFriendRequest(friendRequest_id)),
    createRoom: (room) => dispatch(composeRoom(room)),
    fetchUserRooms: (id) => dispatch(fetchUserRooms(id)),
    fetchRoomMessages: (roomId) => dispatch(fetchRoomMessages(roomId)),
    destroyRoom: (id) => dispatch(deleteUserRoom(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Friendship);
