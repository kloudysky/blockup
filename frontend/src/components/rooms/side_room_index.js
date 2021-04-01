import React, { Component } from "react";
import SideRoomItem from "./side_room_item";

export class SideRoomIndex extends Component {
  componentDidMount() {
    this.props.fetchUserRooms(this.props.user.id);
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <i class="fas fa-user-circle"></i>
          <div className="sidebar-header-right">
            <i class="fas fa-user-friends"></i>
            <i class="fas fa-comments"></i>
            <i class="fas fa-caret-down"></i>
          </div>
        </div>
        <div className="sidebar-search">
          <div className="search-container">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="sidebar-chats">
          {this.props.rooms.legnth > 0 ? (
            this.props.rooms.map((room) => (
              <SideRoomItem key={room.id} id={room.id} name={room.name} />
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
