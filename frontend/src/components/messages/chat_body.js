import React, { Component } from "react";

export class ChatBody extends Component {
  messageCheck() {
    const room = this.props.room;
    if (room && room.messages) {
      return room.messages.map((message) => (
        <p
          key={message._id}
          className={`chat-message ${
            this.props.user.id === message.author._id ? "chat-reciever" : ""
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
