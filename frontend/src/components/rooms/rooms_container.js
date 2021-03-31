import { connect } from "react-redux";
import { composeRoom, fetchUserRooms } from "../../actions/room_actions";
import Rooms from "./rooms";

const mapStateToProps = (state) => {
  return {
    user: state.session.currentUser,
    verified: state.session.isVerified,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (room) => dispatch(composeRoom(room)),
    fetchUserRooms: (id) => dispatch(fetchUserRooms(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
