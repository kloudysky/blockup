import React from "react";
import { Link } from "react-router-dom";
// import logo from "../../logo_transparent.png";
import openSocket from "socket.io-client";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.socket = openSocket("http://localhost:5000", {
      transports: ["websocket"],
    });

    this.state = {
      receiver: "",
      sender: "",
    }

    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.senderIds = [];
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
        }) }, 5000);
      }
    })

    this.socket.on("friend request cancelled", (data)=>{

      const socket_receiver_index = this.senderIds.indexOf(data.socket_receiver_id);
      const id_index = this.senderIds.indexOf(data.id);

      if (socket_receiver_index > -1) {
        this.senderIds.splice(id_index, 1);
      }

      if (id_index > -1) {
        this.senderIds.splice(id_index, 1);
      }
    })

    this.socket.on("unfriend received", (data)=>{

      const socket_receiver_index = this.senderIds.indexOf(data.socket_receiver_id);
      const id_index = this.senderIds.indexOf(data.id);

      if (socket_receiver_index > -1) {
        this.senderIds.splice(id_index, 1);
      }

      if (id_index > -1) {
        this.senderIds.splice(id_index, 1);
      }
    })


    this.socket.on("create room received", (data)=>{
      
      if(data.socket_receiver_id === this.props.currentUser.id){
  
        this.props.fetchUserRooms(this.props.currentUser.id)
      }

    })

    this.socket.on("delete room received", (data)=>{
      
      if(data.socket_receiver_id === this.props.currentUser.id){

       
        if(this.props.activeRoom._id === data.roomId){

          this.props.resetActiveRoom()
        }

          setTimeout(()=>this.props.fetchUserRooms(this.props.currentUser.id).then(()=>{
            if(this.props.activeRoom === -1 || this.props.activeRoom === undefined) { 

              if(this.props.rooms.length > 0){
                this.props.fetchActiveRoom(this.props.rooms[0]._id).then(
                  ()=>{this.props.fetchRoomMessages(this.props.rooms[0]._id)}
                  );
                }
              }

            }) , 10)       
        
      }

    })


  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout()
    
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      if (this.props.verified) {
        return (
          <div>
  
            <Link to={"/developers"} id="developers-icon-after-signin">
              Meet Our Developers
            </Link>

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
        </div>
        );
      } else {
        return (
          <div>
            <Link to={"/twoFASetup"}>Setup 2FA</Link>
            <button onClick={this.logoutUser}>Logout</button>
            <Link to={"/developers"} id="developers-icon">
              Meet Our Developers
            </Link>
          </div>
        );
      }
    } else {
      return (
        <div className="navbar">
          <div className="nav-signup-login">
            <Link to={"/signup"}>Signup</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/developers"} id="developers-icon">
              Meet Our Developers
            </Link>
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
