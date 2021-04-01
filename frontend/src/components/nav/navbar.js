import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo_transparent.png";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  componentDidMount(){
    this.props.receiveCurrentUser(this.props.currentUser)
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      if (this.props.verified) {
        return (
          <div className="top-nav-bar">
            <Link to={"/friends"} className="friend-icon">👥</Link>
            <Link to={"/messages"}>Messages</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/new_message"}>Write a Tweet</Link>
            <button onClick={this.logoutUser}>Logout</button>
          </div>
        );
      } else {
        return (
          <div>
            <Link to={"/twoFASetup"}>Setup 2FA</Link>
            <button onClick={this.logoutUser}>Logout</button>
          </div>
        );
      }
    } else {
      return (
        <div className="navbar">
          <div className="nav-signup-login">
            <Link to={"/signup"}>Signup</Link>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div className="top-nav">{this.getLinks()}</div>;
  }
}

export default NavBar;
