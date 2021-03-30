import React from "react";
import { Link } from "react-router-dom";

import qrcode from "qrcode";
import logo from "../../logo_transparent.png";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
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
          <div>
            <Link to={"/messages"}>Messages</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/new_message"}>Write a Tweet</Link>
            <Link to={"/twoFASetup"}>Setup2FA</Link>
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
        <div className= "navbar">
          <div className="circle">_</div>
          <div className="logo-div">
            <img className="logo-img" src={logo}></img>
          </div>
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
