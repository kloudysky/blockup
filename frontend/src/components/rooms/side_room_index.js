import React, { Component } from "react";
// import UiReducer from "../../reducers/ui_reducer";
import SideRoomItem from "./side_room_item";
// import openSocket from "socket.io-client";
import { BsPlusCircleFill } from "react-icons/bs";
// const { useState } = React;
import {Link} from "react-router-dom";

export class SideRoomIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      less2peope: "",
      name: "",
      members: [],
    };
    this.createRoom = this.createRoom.bind(this);
    this.openModal = this.openModal.bind(this);
    this.update = this.update.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    const id = this.props.user.id;
    ;
    this.props.fetchFriends(id);
    this.props.fetchUserRooms(id).then(()=>{
      if(this.props.activeRoom === -1 || this.props.activeRoom === undefined) {
        if(this.props.rooms.length > 0){
          this.props.setActiveRoom(this.props.rooms[0]._id).then(
            ()=>{this.props.fetchRoomMessages(this.props.rooms[0]._id)}
          );
        }
  
      }

      if(this.props.activeRoom && this.props.activeRoom !== -1){
        this.props.fetchRoomMessages(this.props.activeRoom._id)
      }

      }
    )
  }

  createRoom(){



    if(this.state.members.length > 1 && this.state.name !== ""){
      const user = {
        id: this.props.user.id,
        username: this.props.user.username
      };
  
      const room = {
        name: this.state.name,
        user: user,
        members: this.state.members
      };
  
      this.props.createRoom(room);
      this.closeModal();
    }
  }

  openModal() {
    const ele = document.getElementById("modal");
    ele.style.display = "flex";
  }

  closeModal(){
    const ele = document.getElementById("modal");
    ele.style.display = "none";
  }

  update(field) {

    return(e)=> {

    
      if (field === "name") {

        // return (e) =>{
            this.setState({
              name: e.currentTarget.value,
            });
        // }
      } else {
    
        // return (e) =>{
            this.setState({
              members: [...this.state.members, {_id: e.currentTarget.value}],
            });
        // }
      }

    }
  }

  render() {
    let friends = "";
    if (this.props.friends) {
      friends = this.props.friends.map((friend) => {
        return (
            <label className="friend-label" htmlFor={friend.id} key={friend.id}><input type="checkbox" key={friend.id} value={friend.id} id={friend.id} onChange={this.update("members")} />{friend.username}</label>
        );
      });
    }


    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-left">
            <Link to={`/profile`} className="user-icon-link"> <i className="fas fa-user-circle"></i> </Link>
            {/* <i className="fas fa-user-circle"></i> */}
            <h3>{this.props.user.username}</h3>
          </div>

          <div className="sidebar-header-right">
            <BsPlusCircleFill size="30px" onClick={this.openModal} />
          </div>

          <form id="modal" onSubmit={this.createRoom} tabIndex="0">
            <div className="close-modal" onClick={this.closeModal}>X</div>
            <p>Create a new Room</p>
            <input
              placeholder="Room name"
              onChange={this.update("name")}>
            </input>
            <div className="all-friends" >
              {friends}
            </div>
            <input
              className="submit-room"
              type="submit"
              value="Create Room"
            ></input>
            <p className="room-notes">Note: this room will only be created if it has more than two members including yourself. Create/enter rooms for only 2 members, please go to the friends page 👥 and click ✉️ </p>
    
          </form>

        </div>
        <div className="sidebar-search">
          <div className="search-container">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="sidebar-chats">
          {this.props.rooms.length > 0 ? (
            this.props.rooms.map((room) => (
              <SideRoomItem
                key={room._id}
                id={room._id}
                name={room.name}
                user={this.props.user}
                setActiveRoom={this.props.setActiveRoom}
                activeRoom={this.props.activeRoom}
                getRoomMessages={this.props.fetchRoomMessages}
                getMessage={this.props.fetchMessage}
                receiveRoomMessage={this.props.receiveRoomMessage}
                destroyRoom={this.props.destroyRoom}
                roomMembers={room.members}
              />
            ))
          ) : (
            <p>No rooms</p>
          )}
        </div>
      </div>
    );
  }
}

export default SideRoomIndex;
