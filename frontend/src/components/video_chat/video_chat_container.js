import { connect } from "react-redux";
import {VideoChat} from "./video_chat";

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    errors: state.errors.session,
    room: state.ui.activeRoom.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);
