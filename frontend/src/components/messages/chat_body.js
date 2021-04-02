import React, { Component } from "react";

export class ChatBody extends Component {
  messageCheck() {
    const room = this.props.room;
    if (room.id > 0 && room.messages.length > 0) {
      return room.messages.map((message) => (
        <p
          className={`chat-message ${
            this.props.user._id === message.author._id ? "chat-reciever" : ""
          }`}
        >
          <span className="chat-name">{message.author.username}</span>
          {message.content}
          <span className="chat-timestamp">3AM!</span>
        </p>
      ));
    } else {
      return (
        <div>
          <p>No Messages</p>
        </div>
      );
    }
  }

  render() {
    return <div className="chat-body">{this.messageCheck()}</div>;
  }
}

export default ChatBody;
