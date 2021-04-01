import React from "react";
import { withRouter } from "react-router-dom";
import { fetchUserRooms } from "../../actions/room_actions";
import RoomListItem from "./roomListItem";

class RoomIndex extends React.Component {
  
  componentDidMount() {
    fetchUserRooms(this.props.user.id);
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
    let rooms = this.props.rooms;
    if (rooms.length === 0) return null;

    rooms = Object.values(rooms);
    const allRooms = rooms.map((room) => (
      <li key= {room.id}>
        <RoomListItem
          key = {room.id}
          name = {room.name}
          image = {room.image_url}
        />
      </li>
    ))
    
    return (
      <div className="room-index">
        <ul>
          {allRooms}
        </ul>
      </div>
    );
  }
}

export default withRouter(RoomIndex);
