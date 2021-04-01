import React from "react";

export class SideRoomItem extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      activeRoom: null
    }

    this.getActiveRoom = this.getActiveRoom.bind(this);
  }
  getActiveRoom() {
    debugger;
    return this.props.setActiveRoom(this.props.id);
  }

  render() {
    let roomName;
    if (this.props.activeRoom){
     roomName = this.props.activeRoom.name;
    } else {
      roomName = "No Rooms no active room";
    }
    return (
      <div onClick={() => this.getActiveRoom()} className="sidebar-chat">
        <i class="fas fa-user-circle"></i>
        <div className="sidebar-chat-info">
          <h2>{this.props.name}</h2>
          <p>This is the last message in room</p>
        </div>
      </div>
    );
  }
}

export default SideRoomItem;
