import React, { Component } from "react";
import UiReducer from "../../reducers/ui_reducer";
import SideRoomItem from "./side_room_item";
import openSocket from "socket.io-client";
import {BsPlusCircleFill} from "react-icons/bs"

export class SideRoomIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      members: []
    };
    this.createRoom = this.createRoom.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  componentDidMount() {
    this.props.fetchUserRooms(this.props.user.id);
    if (this.props.rooms.length > 0) {
      this.props.setActiveRoom(this.props.rooms[0]._id);
    }
  }

  createRoom(){
    this.props.createRoom(this.state.room);
  }

  openModal(){
    const ele = document.getElementById("modal");
    ele.style.display = "block"
  }

  update(field) {
    if (field === "name"){
    return e => this.setState({
      name: e.currentTarget.value
    })}else{
      const allMembs = this.state.members.push(e.currentTarget.value);
      return e => this.setState({
        members: allMembs
      })
    }
  }

  render() {
    id = this.props.user._id;
    const friends = this.props.fetchFriends(id).map(friend => {
      <option value={friend._id}>{friend.username}</option>
    })
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-left">
            <i class="fas fa-user-circle"></i>
            <h3>{this.props.user.username}</h3>
          </div>

          <div className="sidebar-header-right">
             <BsPlusCircleFill size="30px" onClick={this.openModal}/> 
          </div>
          <form id="modal" onSubmit= {this.createRoom}>
            <p>Create a new Room</p>
            <input placeholder="Room name"></input>
            <select onChange={this.update(members)}>
              {friends}
            </select>
          </form>

        </div>
        <div className="sidebar-search">
          <div className="search-container">
            <i class="fas fa-search"></i>
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
                setActiveRoom={this.props.setActiveRoom}
                activeRoom={this.props.activeRoom}
              />
            ))
          ) : (
            <p>No rooms</p>
          )}
          {/* <SideRoomItem />
          <SideRoomItem />
          <SideRoomItem /> */}
        </div>
      </div>
    );
  }
}

export default SideRoomIndex;
