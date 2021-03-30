import React from "react";
import { Link } from "react-router-dom";
import qrcode from "qrcode";
import logo from "../../logo_transparent.png";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      token: "",
    };
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      token: this.state.token,
      userId: this.props.currentUser.id,
    };

    this.props.verifyTwoFA(data);
    this.setState({ token: "" });
  }

  update() {
    return (e) =>
      this.setState({
        token: e.currentTarget.value,
      });
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
            <button onClick={this.logoutUser}>Logout</button>
          </div>
        );
      } else {
        let imgdata;
        return (
          <div>
            <Link to={"/setup"}>Setup</Link>
            <button onClick={this.logoutUser}>Logout</button>
            <h1>Please setup with your Authenticator</h1>
            {qrcode.toDataURL(this.props.otpauth_url, function (err, data) {
              imgdata = data;
              console.log(imgdata);
            })}
            <img src={`${imgdata}`} alt="" />
            <form onSubmit={this.handleSubmit}>
              <label>Enter Token:</label>
              <input
                type="text"
                value={this.state.token}
                onChange={this.update()}
                placeholder="000000"
              />
              <input type="submit" value="Submit" />
            </form>
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
              <Link to={'/signup'}>Signup</Link>
              <Link to={'/login'}>Login</Link>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="top-nav">
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
