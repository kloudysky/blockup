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
      deleteId: "",
    };

    this.getActiveRoom = this.getActiveRoom.bind(this);
    this.hanleShowMembers = this.hanleShowMembers.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
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


  openModal(id) {
    return()=>{

      const ele = document.getElementById(id);
      if(ele){
  
        ele.style.display = "flex";
      }

    }
  }

  closeModal(id){
    return()=>{

      // const ele = document.getElementById("delete-room-modal");
      const ele = document.getElementById(id);
      if(ele){
        ele.style.display = "none";
      }

    }
  }

  deleteRoom(id){
    return()=>{

      const roomMembers = this.props.activeRoom.members

      this.props.destroyRoom(id).then(()=> {
     
        const index = roomMembers.indexOf(this.props.user.id);

        if (index > -1) {
          roomMembers.splice(index, 1);
        }

        this.socket.emit("delete room", {members: roomMembers, roomId: id});
        
        this.props.resetActiveRoom();

        setTimeout(()=>this.props.fetchUserRooms(this.props.user.id).then(()=>{
          // if(this.props.activeRoom === -1 || this.props.activeRoom === undefined) {
            if(this.props.rooms.length > 0){
              this.props.setActiveRoom(this.props.rooms[0]._id).then(
                ()=>{this.props.fetchRoomMessages(this.props.rooms[0]._id)}
              );
            }
          // }
        }) , 3)

        this.closeModal(id)();

      })
    }
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

    // let roomName;
    // if (this.props.activeRoom) {
    //   roomName = this.props.activeRoom.name;
    // } else {
    //   roomName = "No Rooms no active room";
    // }

    const members = this.props.roomMembers
    let room_member_name;
    let room_member_pic;
    let room_members_pic = "multiple-users.png";
    if(members.length === 2){
      members.forEach(member => {
        if(member._id !== this.props.user.id){
          room_member_name = member.username;
          room_member_pic = member.img_url ?  member.img_url : "default-user-pic.png";
        }

      });

      // room_member_name = this.props.roomMembers[0]._id === this.props.user.id ? this.props.roomMembers[1].username : this.props.roomMembers[0].username
    }

    const showMembersUi =(        
        <ul className="room-members-ul">
          <p>Group ({members.length})</p>
          {members.map((member)=>(
            
            <li key={member._id} className="room-members-li">
              <img src={member.img_url ?  member.img_url : "one-user.png" } alt="user pic" className="user-pic-chat-room-small"/>
              <p className="room-friend-request-username">Username: {member.username}</p>
              <p className="room-friend-request-id">id: {member._id}</p>

            </li>
          ))}
        </ul>
    )


    return (

      <div>

        <div onClick={() => this.getActiveRoom()} className="sidebar-chat">
          {/* <i className="fas fa-user-circle"></i> */}
          <img src={members.length === 2 ? room_member_pic : room_members_pic } alt="users pic" className="user-pic-chat-room-big"/>
          <div className="sidebar-chat-info">
            <p className="room-name-list">{ room_member_name ? room_member_name : this.props.name}</p>
            {/* <h3>{this.props.name}</h3> */}
          </div>
          {/* <button className="destroy-room" onClick={() => this.props.destroyRoom(this.props.id)}>delete</button> */}
    <button className="destroy-room" onClick={this.openModal(this.props.id + "deleteRoom")}>delete</button>

    <div id={this.props.id + "deleteRoom" }className="delete-room-modal">
      <div className="unfriend-modal-container">

    <div className="close-unfriend-modal" onClick={this.closeModal(this.props.id + "deleteRoom")}>&times;</div>
    <p className="unfriend-modal-sent">Delete this room ({this.props.name}) will not delete your friendships between you and the members in this room. </p>
    <button className="unfriend-btn" onClick={this.closeModal(this.props.id + "deleteRoom")}>Cancel</button>
    {/* <button className="unfriend-btn" onClick={()=> this.props.destroyRoom(this.props.id).then(()=> this.closeModal())}>Confirm</button> */}
    <button className="unfriend-btn" onClick={this.deleteRoom(this.props.id)}>Confirm</button>

  </div>

</div>
          <button className="show-room-members"onClick={this.hanleShowMembers}>members</button>
        </div>

          {this.state.showMembers ? showMembersUi : null}

      </div>


    );
  }
}

export default SideRoomItem;
