import React from "react";
import openSocket from "socket.io-client";

class Friendship extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverId: '',
      cannotAddSelf: '',
      cannotBeEmpty: '',
      lengthTooShort: '',
      lengthTooLong: '',
      cannotFindUser: '',
    };

    // this.senderIds = [];
    this.socket = openSocket("http://localhost:5000", {
      transports: ["websocket"],
    });


    this.sendFriendsRequest = this.sendFriendsRequest.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.updateInput =  this.updateInput.bind(this);
    // this.createRoom = this.createRoom.bind(this);
    // this.acceptAndCreate = this.acceptAndCreate(this);
   
  }

  componentDidMount() {

    
    this.props.fetchFriendRequests(this.props.user.id)
    this.props.fetchFriendships(this.props.user.id)
    this.props.fetchUserRooms(this.props.user.id)

    this.socket.on("friend request accepted", (data )=>{
      if(data.sender_id === this.props.user.id){
        this.props.fetchFriendRequests(this.props.user.id).then(()=>{
          this.props.fetchFriendships(this.props.user.id).then(()=>{
            this.props.fetchUserRooms(this.props.user.id)
          })
        })
      }
    })
  }

  updateInput(e) {

      this.setState({
        receiverId: e.target.value,
      });
  }

  sendFriendsRequest(e){
    e.preventDefault()
    let errs = 0;
    let addSelf = '';
    let beEmpty = '';
    let tooShort ='';
    let tooLong ='';
    let findUser ='';

    if (this.state.receiverId === this.props.user.id) {
      addSelf = <p className="id-error">Friend id cannot be your id </p>
      errs++;
    }

    if (this.state.receiverId === "") {
      beEmpty = <p className="id-error">Friend id cannot be empty </p>
      errs++;
    }

    if (this.state.receiverId.length < 24) {
      tooShort = <p className="id-error">Friend id cannot be short than 24 digit </p>
      errs++;
    }

    if (this.state.receiverId.length > 24) {
      tooLong = <p className="id-error">Friend id cannot be longer than 24 digit </p>
      errs++;
    }

    this.setState({
      cannotAddSelf: addSelf ,
      cannotBeEmpty: beEmpty,
      lengthTooShort: tooShort,
      lengthTooLong: tooLong,
      cannotFindUser: findUser
    })
    
    if(errs === 0){
      this.props.makeFriendRequest({senderId: this.props.user.id, receiverId: this.state.receiverId}).then(()=>{

        this.socket.emit("friend request", {receiver_id: this.state.receiverId, sender_id: this.props.user.id,sender_username: this.props.user.username});
        this.setState({
          receiverId: "",
        })
      }, (res)=>{

        if(res.response.data.idCannotfound  === "Entered id cannot be found"){
          findUser = <p className="id-error">Entered id cannot be found </p>
          this.setState({
            cannotFindUser: findUser
          })
        }
      }) 
    }
  }

  acceptRequest(friendRequest){
    return ()=>{
      this.props.deleteFriendRequest(friendRequest._id)
      .then(()=>{
        this.props.createFriendship(
        {friend1: friendRequest.senderId._id , 
        friend2: friendRequest.receiverId._id})}).then(()=>{

     const user = {
        id: friendRequest.receiverId._id,
        username: friendRequest.receiverId.username
      };
      const room = {
        name: friendRequest.senderId.username + " & " +  friendRequest.receiverId.username,
        user: user,
        members: [{_id: friendRequest.senderId._id} ]
      };

      this.props.createRoom(room);
        }).then(()=>{
          this.socket.emit("accepted friend request", {receiver_id: friendRequest.receiverId._id, sender_id: friendRequest.senderId._id});
        }).then(()=>{
          this.props.fetchUserRooms(this.props.user.id)
        })
    }
  }


  cancelRequest(friendRequest_id){
    return ()=>{
      this.props.deleteFriendRequest(friendRequest_id)
    }
  }

  handleUnfriend(ids){
    return()=>{
      this.props.deleteFriendship(ids[0]).then(()=>{
        Object.values(this.props.rooms).forEach((ele)=>{
          if(ele.members.length === 2 && ele.members.every(member => ids.slice(1).includes(member))){
            this.props.destroyRoom((ele._id))
          }
        })
      })
    }
  }

  handleRoom(ids){
    return()=>{
        // Object.values(this.props.rooms).forEach((ele)=>{
        //   if(ele.members.length === 2 && ele.members.every(member => ids.slice(-2).includes(member))){
        //               
        //     this.props.setActiveRoom((ele._id)).then(()=>{
        //     this.props.history.push('/')
        //     })
        //   }
        // })
        const rooms = Object.values(this.props.rooms).filter((ele)=>{
          return (ele.members.length === 2 && ele.members.every(member => ids.slice(0,2).includes(member)))
      
        })


        if(rooms.length > 0){

          this.props.setActiveRoom((rooms[0]._id)).then(()=>{
          this.props.history.push('/')
          })
        }else{

          const user = {
            id: ids[1],
            username: ids[3]
          };
          const room = {
            name: ids[2] + " & " +  ids[3],
            user: user,
            members: [{_id: ids[0]} ]
          };
    
          this.props.createRoom(room).then(()=>{

            this.handleRoom(ids)()
          })

        }
       
    }
  }


  render(){
   
      let friends = (
        <div className="all-friends">
                {Object.values(this.props.friendships).map((friendship,idx)=>(
                  <div className="individual-msg" key={idx}>
                      <p className="friend-page-username">😃 {friendship.friend1._id === this.props.user.id ? friendship.friend2.username : friendship.friend1.username}</p>
                      <p className="friend-page-lastest-msg">{this.props.roomsFor2[friendship.friend1._id === this.props.user.id ? friendship.friend2._id : friendship.friend1._id]}</p>
                      {/* <Link to={`/`} className="msg-link">✉️ </Link> */}
                      <button onClick={this.handleRoom([friendship.friend1._id,friendship.friend2._id,friendship.friend1.username, friendship.friend2.username])} className="msg-button">✉️ </button>
                      <button className="unfriend" onClick={this.handleUnfriend([friendship._id,friendship.friend1._id,friendship.friend2._id])}>❌</button>
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
          {friend_request.map((friendReq,idx)=>(
            <div key={idx}>
              <p>📥 {friendReq.senderId.username}</p>
                <button onClick={this.acceptRequest(friendReq)}>Accept</button>
                <button onClick={this.cancelRequest(friendReq._id)}>Delete</button>
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
   
    const username = this.props.user.username

      return(
        <div className="friends-container">
          <p className="friends-title">{username[0].toUpperCase() + username.slice(1)}'s Friends</p>
          <div className="inner-container">
            {friends}
            <div className="right-container">
              {this.state.cannotAddSelf}
              {this.state.cannotBeEmpty}
              {this.state.lengthTooShort}
              {this.state.lengthTooLong}
              {this.state.cannotFindUser}
              <form className="add-friend" onSubmit={this.sendFriendsRequest}>
                <input className="put-friend-id" onChange={this.updateInput} placeholder="Enter your friend id" type="text" value={this.state.receiverId}/>
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