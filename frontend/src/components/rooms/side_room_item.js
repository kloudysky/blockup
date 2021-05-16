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
      showMembers: false,
    };

    this.getActiveRoom = this.getActiveRoom.bind(this);
    this.hanleShowMembers = this.hanleShowMembers.bind(this);
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

  hanleShowMembers(){
    if(this.state.showMembers){
      this.setState({
        showMembers: false
      })
    }else{
      this.setState({
        showMembers: true
      })
    }
  }

  render() {

    let roomName;
    if (this.props.activeRoom) {
      roomName = this.props.activeRoom.name;
    } else {
      roomName = "No Rooms no active room";
    }

    const showMembersUi =(        
        <ul className="room-members-ul">
          <p>Group ({this.props.roomMembers.length})</p>
          {this.props.roomMembers.map((member)=>(

            <li key={member._id} className="room-members-li">
              <p className="room-friend-request-username">Username: {member.username}</p>
              <p className="room-friend-request-id">id: {member._id}</p>

            </li>
          ))}
        </ul>
    )


    return (

      <div>

        <div onClick={() => this.getActiveRoom()} className="sidebar-chat">
          <i className="fas fa-user-circle"></i>
          <div className="sidebar-chat-info">
            <h2>{this.props.name}</h2>
          </div>
          <button className="destroy-room" onClick={() => this.props.destroyRoom(this.props.id)}>delete</button>
          <button className="show-room-members"onClick={this.hanleShowMembers}>members</button>
        </div>

          {this.state.showMembers ? showMembersUi : null}

      </div>


    );
  }
}

export default SideRoomItem;
