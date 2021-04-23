import React from "react";
import openSocket from "socket.io-client";
import Peer from 'peerjs';


export class VideoChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        test: false 
    }
    this.socket = openSocket("http://localhost:5000", {
      transports: ["websocket"],
    });

    this.myPeer = new Peer(this.props.user.id, {
        host: '/',
        port: '3001'
    });

    this.videoRef = React.createRef()
    this.videoGrid = React.createRef()
    this.peers = {}

    this.leaveMeeting = this.leaveMeeting.bind(this)
  }

  componentDidMount(){

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
         
        const videoObj = this.videoRef.current;
        videoObj.srcObject = stream;
        videoObj.innerHTML = this.props.user.username
        videoObj.muted = true;
        videoObj.play();
 
     
        this.myPeer.on('call', call => {
        
          call.answer(stream)

          const video = document.createElement('video')
        
          call.on('stream', userVideoStream => {
         
            this.addVideoStream(video, userVideoStream)
          })
        })
      
        this.socket.on('user-connected', userId => {
            console.log(userId, "**************user connnected")
         
            this.connectToNewUser(userId, stream)
        })
      })
      
      this.socket.on('user-disconnected', userId => {
          console.log("disconnect**************************", userId)
        if (this.peers[userId]) this.peers[userId].close()
      })

    this.myPeer.on('open', id => {
        this.socket.emit("join video chat", this.props.match.params.roomId, this.props.user.id);
      })
  }

    connectToNewUser(userId, stream) {
      
         setTimeout(()=>{

                   const call = this.myPeer.call(userId, stream)
                   const video = document.createElement('video')
            
                   
                   call.on('stream', userVideoStream => {
                     this.addVideoStream(video, userVideoStream)   
                   })
           
                   call.on('close', () => {
                       video.remove()
                   })
                   this.peers[userId] = call
         },3000)
        // let s = document.createElement('p')
        // s.innerHTML = 'hah'
        // this.videoGrid.current.appendChild(s)
     
    }

    addVideoStream(video, stream) {
      
      video.srcObject = stream
 
      video.addEventListener('loadedmetadata', () => {
    
        // setTimeout(()=> video.play(), 3000)
        video.play()
      })

      
      this.videoGrid.current.appendChild(video)
    }

    leaveMeeting(){

        this.props.history.push("/")
        window.location.reload();
    }
  
  render(){
    const myVideo = <video ref={this.videoRef}></video>
      return (
        <div>
            <h1>{this.props.room}</h1>
            <div id="video-grid" ref={this.videoGrid} >
                {myVideo}
                <p className="video-username"> {this.props.user.username}</p>
             
            </div>
            
            <button onClick={this.leaveMeeting}>Leave Meeting</button>
        </div>
      )
  }
}
