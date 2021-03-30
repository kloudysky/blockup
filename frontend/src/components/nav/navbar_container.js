import { connect } from "react-redux";
import * as sessionActions from "../../actions/session_actions";

import NavBar from "./navbar";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
  verified: state.session.isVerified,
  otpauth_url: state.session.user.otpauth_url,
  currentUser: state.session.user,
});

const mapDispatchToProps = (dispatch) => ({
  verifyTwoFA: (token) => dispatch(sessionActions.verifyTwoFA(token)),
  logout: () => dispatch(sessionActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
