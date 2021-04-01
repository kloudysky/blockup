import { connect } from "react-redux";
import { fetchUserRooms } from "../../actions/room_actions";
import SideRoomIndex from "./side_room_index";

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    errors: state.errors.session,
    rooms: Object.values(state.rooms),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRooms: (id) => dispatch(fetchUserRooms(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideRoomIndex);
