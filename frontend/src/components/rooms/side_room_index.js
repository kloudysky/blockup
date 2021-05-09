import React, { Component } from "react";
import UiReducer from "../../reducers/ui_reducer";
import SideRoomItem from "./side_room_item";
import openSocket from "socket.io-client";
import { BsPlusCircleFill } from "react-icons/bs";
const { useState } = React;

export class SideRoomIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
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
    // debugger;
    this.props.fetchFriends(id);
    this.props.fetchUserRooms(id).then(()=>{
      if (this.props.rooms.length > 0) {
        this.props.setActiveRoom(this.props.rooms[0]._id);
      }
    })
  }

  createRoom(){
    this.props.createRoom(this.state);
    this.closeModal();
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
    if (field === "name") {
      return (e) =>
        this.setState({
          name: e.currentTarget.value,
        });
    } else {
      return (e) =>
        this.setState({
          members: [...this.state.members, e.currentTarget.value],
        });
    }
  }

  render() {
    let friends = "";
    if (this.props.friends) {
      friends = this.props.friends.map((friend) => {
        return (
            <label className="friend-label" for={friend.id}><input type="checkbox" key={friend.id} value={friend.id} id={friend.id} />{friend.username}</label>
        );
      });
    }


    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-left">
            <i className="fas fa-user-circle"></i>
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
            <div className="all-friends" onChange={this.update("members")}>
              {friends}
            </div>
            <input
              className="submit-room"
              type="submit"
              value="Create Room"
            ></input>
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
