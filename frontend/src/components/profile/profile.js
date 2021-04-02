import React from 'react';

class Profile extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {user} = this.props;
        return (
            <div className="profile">
                <div className="profilebody">
                    <p>Hello, {user.username}!</p>
                    <p>ID: {user.id}</p>
                </div>
            </div>

        )
    }
}

export default Profile;