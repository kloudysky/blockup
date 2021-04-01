import React from "react";
import Chatbody from "./chat_body";

export class ChatBox extends React.Component {
  componentDidMount() {
    // this.props.fetchRoomMessages(this.props.activeRoom._id)
  }
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
        <Chatbody />
        <div className="chat-footer">
          <i class="fas fa-laugh-wink"></i>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange()}
              type="text"
              placeholder="Message"
            />
            <button type="submit">Send</button>
          </form>
          <i class="fas fa-microphone"></i>
        </div>
      </div>
    );
  }
}

export default ChatBox;
