import React from "react";
import ChatBox from "./messages/chat_box";
import SideRoomIndex from "./rooms/side_room_index";

function WebApp() {
  return (
    <div className="webapp">
      <div className="webappbody">
        <SideRoomIndex />
        <ChatBox />
      </div>
    </div>
  );
}

export default WebApp;
