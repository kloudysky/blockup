import React from "react";
import { fetchUserRooms } from "../../actions/room_actions";
import RoomListItem from "./roomListItem";

class RoomIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            room: []
        }
    }

    componentDidMount() {
        fetchUserRooms(this.props.user._id);
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
        if (this.state.rooms === undefined){
            return ( <div>There are no Rooms</div>)
        } else {
            return (
                <div className="room-index">
                    <h2>Your Rooms</h2>
                    {this.state.rooms.map(room => (
                        <RoomListItem key={room._id} name={room.name} />
                    ))}
                </div>
                );
            }
        }
}

export default (RoomIndex);
