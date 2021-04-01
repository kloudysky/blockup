import React from "react";

export class ChatBox extends React.Component {
  setInput() {}
  sendMessage() {}
  render() {
    return (
      <div className="chat">
        <div className="chat-header">
          <i class="fas fa-user-circle"></i>
          <div className="chat-header-info">
            <h3>Room name</h3>
            <p>Last seen at</p>
          </div>
          <div className="chat-header-right">
            <i class="fas fa-video"></i>
            <i class="fas fa-phone"></i>
          </div>
        </div>
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
        <div className="chat-footer">
          <i class="fas fa-laugh-wink"></i>
          <form>
            <input type="text" placeholder="Message" />
            <button type="submit">Send</button>
          </form>
          <i class="fas fa-microphone"></i>
        </div>
      </div>
    );
  }
}

export default ChatBox;
