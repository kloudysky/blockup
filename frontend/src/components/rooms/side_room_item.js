import React from "react";
import openSocket from "socket.io-client";

export class SideRoomItem extends React.Component {
  constructor(props) {
    super(props);
    this.socket = openSocket("http://localhost:5000", {
      transports: ["websocket"],
    });
    this.state = {
      activeRoom: null,
    };

    this.getActiveRoom = this.getActiveRoom.bind(this);
  }

  componentDidMount() {
    this.socket.emit("join room", this.props.id);
    this.socket.on("incoming message", (msg) => {
      console.log("Incoming Message");
      console.log(msg);
      this.props.receiveRoomMessage(msg);
    });
  }
  
  getActiveRoom() {
    this.props.getRoomMessages(this.props.id);
    return this.props.setActiveRoom(this.props.id);
  }

  render() {
    let roomName;
    if (this.props.activeRoom) {
      roomName = this.props.activeRoom.name;
    } else {
      roomName = "No Rooms no active room";
    }
    return (
      <div onClick={() => this.getActiveRoom()} className="sidebar-chat">
        <i class="fas fa-user-circle"></i>
        <div className="sidebar-chat-info">
          <h2>{this.props.name}</h2>
        </div>
      </div>
    );
  }
}

export default SideRoomItem;
