import React from "react";
import { withRouter } from "react-router-dom";
import { fetchUserRooms } from "../../actions/room_actions";
import Nav from "../nav/navbar_container";
import RoomListItem from "./roomListItem";

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentDidMount() {
    fetchUserRooms(this.props.user.id);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let room = {
      name: this.state.name,
    };
    this.props.createRoom(room);
    e.currentTarget.value = "";
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    // debugger
    const { user } = this.props;
    let rooms = this.props.rooms;
    // debugger
    return (
      <div className="rooms">
        {/* <Nav /> */}
        <form onSubmit={this.handleSubmit}>
          <input
            className="room-new-input"
            placeholder="Room name"
            value={this.state.name}
            onChange={this.update("name")}
          ></input>

          <input type="submit" className="room-submit"></input>
        </form>
        <ul>
          {rooms.map((room) => {
            <li>
              <RoomListItem
                key={room.id}
                name={room.name}
                image={room.image_url}
              />
            </li>;
          })}
        </ul>
      </div>
    );
  }
}

export default withRouter(Rooms);
