import React, { Component } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import DonutSmallOutlinedIcon from "@material-ui/icons/DonutSmallOutlined";
import PeopleIcon from "@material-ui/icons/People";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SideRoomItem from "./side_room_item";

export class SideRoomIndex extends Component {
  componentDidMount() {
    this.props.fetchUserRooms(this.props.user._id);
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
          <SideRoomItem />
          <SideRoomItem />
          <SideRoomItem />
        </div>
      </div>
    );
  }
}

export default SideRoomIndex;
