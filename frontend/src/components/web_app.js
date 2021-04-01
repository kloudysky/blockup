import React from "react";
import ChatBox from "./messages/chat_box";
import SideRoomIndex from "./rooms/side_room_index";
// import Chat from "./components/Chat";
// import Sidebar from "./components/Sidebar";

function WebApp() {
  return (
    <div className="webapp">
      <div className="webappbody">
        {/* <Sidebar /> */}
        <SideRoomIndex />
        {/* <Chat /> */}
        <ChatBox />
      </div>
    </div>
  );
}

export default WebApp;
