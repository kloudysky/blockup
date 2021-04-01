import React from "react";

export class SideRoomItem extends React.Component {
  render() {
    return (
      <div className="sidebar-chat">
        {/* <i class="fas fa-user-circle"></i> */}
        <div className="sidebar-chat-info">
          <h2>Room name</h2>
          <p>This is the last message in room</p>
        </div>
      </div>
    );
  }
}

export default SideRoomItem;
