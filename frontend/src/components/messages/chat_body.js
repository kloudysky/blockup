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

  handleTime(dateTime) {
        let oldDate = new Date(Date.parse(dateTime));
        let currentDate = new Date();
        let dayDiff = oldDate.getDate() - currentDate.getDate();

        let year = oldDate.getFullYear() % 100;
        let month = oldDate.getMonth() + 1;
        let day = oldDate.getDate();
        let hours = oldDate.getHours() > 12 ? oldDate.getHours() - 12 : oldDate.getHours();
        let minutes = oldDate.getMinutes();

        if (dayDiff > 1) {
            return `${month}/${day}/${year} at ${hours}:${minutes}`
        } else if (dayDiff === 1) {
            return `Yesterday at ${hours}:${minutes}`
        } else {
            return `Today at ${hours}:${minutes}`
        }
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
          <span className="chat-timestamp">{this.handleTime(message.createdAt)}</span>
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
