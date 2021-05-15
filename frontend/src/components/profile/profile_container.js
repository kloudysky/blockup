import { connect } from "react-redux";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
    return ({
        user: state.session.user,
    })
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)