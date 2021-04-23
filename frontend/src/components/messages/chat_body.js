import React, { Component } from "react";

export class ChatBody extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  messageCheck() {
    const room = this.props.room;
    const messages = this.props.messages;
    //newMessages is the array of new messages sent in from created messages
    let newMessages = this.props.newMessages || [];

    if (room && room.messages) {
      return messages.map((message) => (
        <p
          key={message._id + `${Math.random(10000)}`}
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
    return (
      <div className="chat-body">
        {this.messageCheck()}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}

export default ChatBody;
