import React from 'react';

class RoomListItem extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        debugger;
        const {name} = this.props
        return(
            <li className="room-item"> Room Item
                <div className="room-name">
                    {name}
                </div>
            </li>
        )
    }
}

export default RoomListItem;