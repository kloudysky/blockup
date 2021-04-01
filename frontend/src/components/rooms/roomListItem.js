import React from 'react';

class RoomListItem extends React.Component {
    constructor(props){
        super(props);
    
    }

    render() {
        const {name, image} = this.props
        return(
            <li className="room-item">
                <div 
                    className="room-name"
                    >{name}
                </div>
                <div>
                    <img src={image}>
                    </img>
                </div>
            </li>
        )
    }
}

export default RoomListItem;