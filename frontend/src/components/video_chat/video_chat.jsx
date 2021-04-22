import React from "react";
import openSocket from "socket.io-client";
import Peer from 'peerjs';

export class VideoChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        videos : [<div>{this.props.user.username}</div>,  <p>testing</p> ] 
    }
    this.socket = openSocket("http://localhost:5000", {
      transports: ["websocket"],
    });

    this.myPeer = new Peer(this.props.user.id, {
        host: '/',
        port: '3001'
    });

    this.videoRef = React.createRef()
    this.videoRef1 = React.createRef()
    this.peers = {}
    this.videos = [<p>{this.props.user.username}</p>]
    this.leaveMeeting = this.leaveMeeting.bind(this)
  }

  componentDidMount(){

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
         
        const videoObj = this.videoRef.current;
     
        videoObj.srcObject = stream;


        videoObj.muted = true;
        videoObj.play();

        this.myPeer.on('call', call => {
     
          call.answer(stream)
          })
      
        this.socket.on('user-connected', userId => {
            console.log(userId, "**************user connnected")
            this.connectToNewUser(userId, stream)
        })
      })
      
      this.socket.on('user-disconnected', userId => {
          console.log("disconnect**************************")
        if (this.peers[userId]) this.peers[userId].close()
      })

    this.myPeer.on('open', id => {
        this.socket.emit("join video chat", this.props.match.params.roomId, this.props.user.id);
      })
  }

    connectToNewUser(userId, stream) {
      debugger
        const call = this.myPeer.call(userId, stream)
        debugger
        call.on('stream', userVideoStream => {

          const videoObj1 = this.videoRef1.current;
     
          videoObj1.srcObject = userVideoStream;
          videoObj1.muted = true;

          videoObj1.addEventListener('loadedmetadata', () => {
            videoObj1.play()
          })
          // videoObj1.play();

            debugger
    
            let new_list = this.state.videos
            // let newVideo = <p></p>

            let newVideo = document.createElement("video")
            newVideo.srcObject = userVideoStream

            // new_list.push(<video src={userVideoStream}>real</video>)
            new_list.push(newVideo)

            // otherVideo.play()
            // new_list.push(<p>test1</p>)
            debugger
            this.setState({videos: new_list})
            // this.videos.push(otherVideo)
            debugger
        })
        call.on('close', () => {
            
        })
        // this.peers[userId] = call
    }

    leaveMeeting(){

        this.props.history.push("/")
        window.location.reload();
    }
  
  render(){
    const myVideo = <video ref={this.videoRef}></video>
    const yourVideo = <video ref={this.videoRef1}></video>

    const video = this.state.videos[2]

    debugger

      return (
        <div>
            <h1>{this.props.room}</h1>
            <div id="video-grid" >
                {myVideo}
                {yourVideo}
                {this.state.videos[0]}
                {/* {video} */}
            </div>
            
            <button onClick={this.leaveMeeting}>Leave Meeting</button>
        </div>
      )
  }
}
