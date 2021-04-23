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
    this.socket.on("incoming message", (msg) => {
      console.log("Incoming Message From Server");
      if (this.props.user.id !== msg.author._id) {
        this.props.receiveRoomMessage(msg);
      }
    });
    this.socket.on("test", (msg) => {
      console.log(msg);
    });
  }

  getActiveRoom() {
    this.socket.emit("leave room", this.props.activeRoom);
    this.props.getRoomMessages(this.props.id);
    this.socket.emit("join room", this.props.id);
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
        <i className="fas fa-user-circle"></i>
        <div className="sidebar-chat-info">
          <h2>{this.props.name}</h2>
        </div>
        <div className="destroy-room" onClick={() => this.props.destroyRoom(this.props.id)}>delete</div>
      </div>
    );
  }
}

export default SideRoomItem;
