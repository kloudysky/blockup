import React from 'react';
import { connect } from "react-redux";
import { fetchSingleRoom } from '../../actions/room_actions';

class RoomListItem extends React.Component {
    constructor(props){
        super(props);

    }

    render() {
        const {name} = this.props
        return(
            <li className="room-item">
                <div className="room-name">
                    {name}
                </div>
            </li>
        )
    }
}

export default (RoomListItem);