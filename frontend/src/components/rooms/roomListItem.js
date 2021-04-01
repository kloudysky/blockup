import React from 'react';

class RoomListItem extends React.Component {

    render() {
        const {name} = this.props
        return(
            <div className="room-item">
                <div 
                    className="room-name"
                    >{name}
                </div>
            </div>
        )
    }
}

export default RoomListItem;