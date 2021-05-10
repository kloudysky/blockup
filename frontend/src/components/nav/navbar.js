import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo_transparent.png";
import openSocket from "socket.io-client";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiver: "",
      sender: "",
    }

    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.senderIds = [];
    this.socket = openSocket("http://localhost:5000", {
      transports: ["websocket"],
    });
  }

  componentDidMount() {
    this.props.receiveCurrentUser(this.props.currentUser);

    this.socket.on("friend request received", (data)=>{

      if(data.receiver_id === this.props.currentUser.id && this.senderIds.indexOf(data.sender_id) === -1){
    
        this.senderIds.push(data.sender_id)
   
        console.log(data.receiver + ", "+ data.sender + " sent you a friend request.")
        // alert(data.receiver + ", "+ data.sender + " sent you a friend request. ");

        this.props.fetchFriendRequests(this.props.currentUser.id)

        this.setState({
          receiver: data.receiver,
          sender: data.sender
        })

        setTimeout(()=>{ this.setState({
          receiver: "",
          sender: ""
        }) }, 3000);
      }
    })
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
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/friends"} className="friend-icon">
              <i className="fas fa-user-friends nav-icon"></i>
            </Link>
            <Link to={"/web"} className="friend-icon">
              <i className="fas fa-comments nav-icon"></i>
            </Link>
            <button onClick={this.logoutUser}>Logout</button>

            <p className="notification">{this.state.receiver !== "" ? "🔔 " +this.state.receiver + ", "+ this.state.sender + " sent you a friend request." : null}</p>
          
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
