import React from 'react';

class RoomListItem extends React.Component {
    constructor(props){
        super(props);
    
    }

    render() {
        // debugger;
        const {name, image} = this.props
        return(
            <div className="room-item">
                <div className="room-name">{name}</div>
                <div>
                    <img src={image}/>
                </div>
            </div>
        )
    }
}

export default RoomListItem;