import React from "react";
import Chatbody from "./chat_body";
import openSocket from "socket.io-client";

export class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };

    this.socket = openSocket("http://localhost:8000");

    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendSocketIO = this.sendSocketIO.bind(this);
  }

  componentDidMount() {
    console.log(this.props.activeRoom);
    if (this.props.activeRoom != -1) {
      this.props.fetchRoomMessages(this.props.activeRoom._id);
    }
  }

  sendSocketIO(msg) {
    this.socket.emit("message", msg);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("currentUser: ...");
    console.log(this.props.currentUser);
    this.props
      .createMessage({
        content: this.state.content,
        author: this.props.currentUser.id,
        room: this.props.activeRoom._id,
      })
      .then(this.props.fetchRoomMessages(this.props.activeRoom._id));
    e.target.value = "";
  }

  handleChange() {
    return (e) => this.setState({ ["content"]: e.target.value });
  }
  setInput() {}
  sendMessage() {}
  render() {
    const room = this.props.activeRoom;
    return (
      <div className="chat">
        <div className="chat-header">
          <i class="fas fa-user-circle"></i>
          <div className="chat-header-info">
            <h3>{room.id === -1 ? "" : room.name}</h3>
          </div>
          <div className="chat-header-right">
            <i class="fas fa-video"></i>
            <i class="fas fa-phone"></i>
          </div>
        </div>
        <Chatbody user={this.props.currentUser} room={room} />
        {/* <p className="chat-message chat-reciever">
        <span className="chat-name">Kloud</span>
        This is a message
        <span className="chat-timestamp">3AM!</span>
      </p> */}
        <div className="chat-footer">
          <i class="fas fa-laugh-wink"></i>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Message"
              onChange={this.handleChange()}
              value={this.state.content}
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
