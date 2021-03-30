import { connect } from "react-redux";
import TwoFASetup from "./two_fa_setup";
import * as sessionActions from "../../actions/session_actions";

const mapStateToProps = (state) => ({
  otpauth_url: state.session.user.otpauth_url,
});

const mapDispatchToProps = (dispatch) => ({
  verifyTwoFA: (token) => dispatch(sessionActions.verifyTwoFA(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TwoFASetup);
