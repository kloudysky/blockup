import { connect } from "react-redux";
import * as sessionActions from "../../actions/session_actions";
import {fetchFriendRequests } from "../../actions/friendship_actions";

import NavBar from "./navbar";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
  verified: state.session.isVerified,
  currentUser: state.session.user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(sessionActions.logout()),
  receiveCurrentUser: currentUser => dispatch(sessionActions.receiveCurrentUser(currentUser)),
  fetchFriendRequests: (id) => dispatch(fetchFriendRequests(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
