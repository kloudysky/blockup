import { connect } from "react-redux";
import { composeRoom } from "../../actions/room_actions";
import Rooms from "./rooms";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (room) => dispatch(composeRoom(room)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
