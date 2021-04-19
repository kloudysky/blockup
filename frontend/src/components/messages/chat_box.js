import React from "react";
import Chatbody from "./chat_body";
import openSocket from "socket.io-client";

export class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      newMessages: [],
    };

    this.socket = openSocket("http://localhost:5000", {
      transports: ["websocket"],
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendSocketIO = this.sendSocketIO.bind(this);
  }

  componentDidMount() {
    if (this.props.activeRoom != -1) {
      console.log("room update");
      // this.props.fetchRoomMessages(this.props.activeRoom._id);

      this.socket.on("incoming message", (msg) => {
        console.log("Incoming Message");
      });
    }
  }

  sendSocketIO(msg) {
    this.socket.emit("message", msg);
    //this.socket.to(msg.room).emit("some event");
  }

  handleSubmit(e) {
    e.preventDefault();
    const msg = {
      content: this.state.content,
      author: this.props.currentUser.id,
      room: this.props.activeRoom._id,
    };
    this.props
      .createMessage(msg)
      .then(this.props.fetchRoomMessages(this.props.activeRoom._id));

    // changes the state array to have new messages pushed into the array to be transferred to chat body
    
    let newMessage = {}
    newMessage['content'] = this.state.content;
    newMessage['author'] = {}
    newMessage.author['username']= this.props.currentUser.username;
    newMessage.author['_id']= this.props.currentUser.id;
    let newArray = this.state.newMessages.concat(newMessage);
    this.setState({['newMessages']: newArray})

    this.setState({ content: "" });
    this.sendSocketIO(msg);
  }

  handleChange() {
    return (e) => this.setState({ ["content"]: e.target.value });
  }

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
        <Chatbody user={this.props.currentUser} room={room} newMessages={this.state.newMessages} />
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
