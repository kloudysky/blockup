import { connect } from "react-redux";
import { composeRoom, fetchUserRooms, fetchRoom } from "../../actions/room_actions";
import Rooms from "./rooms";

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    verified: state.session.isVerified,
    errors: state.errors.session,
    rooms: Object.values(state.rooms)
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showRoom: id => dispatch(fetchRoom(id)),
    createRoom: (room) => dispatch(composeRoom(room)),
    fetchUserRooms: (id) => dispatch(fetchUserRooms(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
