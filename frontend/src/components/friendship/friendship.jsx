import React from "react";
import {Link} from "react-router-dom"

class Friendship extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverId: '',
      cannotAddSelf: '',
      cannotBeenEmpty: '',
      cannotFindUser: '',

    };

    this.sendFriendsRequest = this.sendFriendsRequest.bind(this);
    // this.acceptRequest = this.acceptRequest.bind(this);
    this.updateInput =  this.updateInput.bind(this)
   
  }

  componentDidMount() {
    
    this.props.fetchFriendships(this.props.user.id)
    this.props.fetchFriendRequests(this.props.user.id)
   
    
  }

  updateInput(e) {
    // return (e) =>
      this.setState({
        receiverId: e.target.value,
      });
  }

  sendFriendsRequest(e){
    e.preventDefault()
    debugger
    this.props.makeFriendRequest({senderId: this.props.user.id, receiverId: this.state.receiverId})
    .then(()=>this.props.fetchFriendRequests(this.props.user.id))
    
  }

  acceptRequest(friendRequest){
    return (e)=>{
      e.preventDefault()
      this.props.deleteFriendRequest(friendRequest._id)
      .then(()=>{
        debugger
        this.props.createFriendship(
        {friend1: friendRequest.senderId._id , 
        friend2: friendRequest.receiverId._id})}).then(()=>this.props.fetchFriendships(this.props.user.id))
    }

  }

  cancelRequest(friendRequest_id){
    return ()=>{
      debugger
      this.props.deleteFriendRequest(friendRequest_id)
    }
  }



  handleUnfriend(friendship_id){
    return()=>{
      this.props.deleteFriendship(friendship_id)
    }
  }


  render(){
   
     
      let friends = (
        <div className="all-friends">
                {Object.values(this.props.friendships).map((friendship,idx)=>(
                  <div className="individual-msg" key={idx}>
                      <p className="username">😃 {friendship.friend1._id === this.props.user.id ? friendship.friend2.username : friendship.friend1.username}</p>
                      <p className="lastest-msg">This is last message holder for the lastest conversation between two people, need to pull from message</p>
                      <Link to={`/room/${1}`} className="msg-link">✉️ </Link>
                      <button className="unfriend" onClick={this.handleUnfriend(friendship._id)}>❌</button>
                  </div>
                ))}
          </div>
      )


      let friend_request = [];
      let friend_sent = [];

      Object.values(this.props.friendRequests).forEach(e => {
        if(e.receiverId._id === this.props.user.id ){
            friend_request.push(e)
        }else{
            friend_sent.push(e)
          }
      });

      let friendRequests;
  if (friend_request.length >0){     
    friendRequests = (
        <div className ="request-receiver">
          <p className="all-requests">Friend Requests</p>
          {friend_request.map((e,idx)=>(
            <div key={idx}>
              <p>📥 {e.senderId.username}</p>
                <button onClick={this.acceptRequest(e)}>Accept</button>
                <button onClick={this.cancelRequest(e._id)}>Delete</button>
            </div>
          ))}
        </div>
      );
    }

    let sentRequests;

    if (friend_sent.length > 0){     

      sentRequests = (
        
        <div className ="request-sender">
        <p className="all-requests">Requests Sent</p>
          {friend_sent.map((req,idx)=>(
            <div key={idx}>
              <p>📤 {req.receiverId.username}</p>
              {/* <button onClick={(e)=>{this.props.deleteFriendRequest(e)}}>Cancel</button> */}
              <button onClick={this.cancelRequest(req._id)}>Cancel</button>
            </div>
          ))}
      </div>
      )
    }
   

      return(
        <div>
          <p className="friends-title">Friends</p>
          <div className="inner-container">
            {friends}
            <div className="right-container">
              <form className="add-friend" onSubmit={this.sendFriendsRequest}>
                <input className="put-friend-id" onChange={this.updateInput} placeholder="Enter your friend id" type="text"/>
                <button className="add-btn">➕</button>
              </form>
              {friendRequests}
              {sentRequests}

          </div>
          </div>
          
        </div>
      )
  }
}

export default Friendship;