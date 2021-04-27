import { connect } from "react-redux";
import {VideoChat} from "./video_chat";

const mapStateToProps = (state) => {
    const myFriends = {};
    state.session.user.friends.forEach(friend => {
      myFriends[friend.id] = friend.username
    });
  return {
    user: state.session.user,
    errors: state.errors.session,
    room: state.ui.activeRoom.name,
    friends: myFriends
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// };

export default connect(mapStateToProps, null)(VideoChat);
