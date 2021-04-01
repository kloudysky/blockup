import React from "react";
import ChatBoxContainer from "./messages/chat_box_container";
import SideRoomIndexContainer from "./rooms/side_room_index_container";

function WebApp() {
  return (
    <div className="webapp">
      <div className="webappbody">
        <SideRoomIndexContainer />
        <ChatBoxContainer />
      </div>
    </div>
  );
}

export default WebApp;
