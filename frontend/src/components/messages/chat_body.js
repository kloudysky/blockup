import React from "react";

function Chatbody() {
  return (
    <div className="chat-body">
      <p className="chat-message">
        <span className="chat-name">Kloud</span>
        This is a message
        <span className="chat-timestamp">3AM!</span>
      </p>
      <p className="chat-message chat-reciever">
        <span className="chat-name">Kloud</span>
        This is a message
        <span className="chat-timestamp">3AM!</span>
      </p>
    </div>
  );
}

export default Chatbody;
