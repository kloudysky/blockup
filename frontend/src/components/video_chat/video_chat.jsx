import React, { useImperativeHandle } from "react";
import openSocket from "socket.io-client";
import Peer from 'peerjs';


export class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: []
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

    // const myVideo = document.createElement('video')
    // myVideo.muted = true

    navigator.mediaDevices.getUserMedia({
        video: this.props.match.params.isVideo === "true"? true : false, 
        audio: true,
      }).then(stream => {
         
        // this.addVideoStream(myVideo , stream)
      
        const videoObj = this.videoRef.current;
        videoObj.srcObject = stream;
        videoObj.innerHTML = this.props.user.username
        videoObj.muted = true;
        videoObj.play();
 
        this.myPeer.on('call', call => {
          
          this.peers[call.peer] = call

          call.answer(stream)

          const video = document.createElement('video')
        
          call.on('stream', userVideoStream => {
            this.addVideoStream(video, userVideoStream,call.peer)
          })

          call.on('close', () => {
            video.remove()
            
            if(document.getElementById(call.peer)){

              document.getElementById(call.peer).remove();
            }

          })


        })
      
        this.socket.on('user-connected', userId => {
            console.log(userId, "**************user connnected")
            setTimeout(()=>{

                this.connectToNewUser(userId, stream)
       
            },1000)
        })
      })
      
      this.socket.on('user-disconnected', userId => {
          console.log("disconnect**************************", userId)
        if (this.peers[userId]) this.peers[userId].close()
      })

    this.myPeer.on('open', id => {
        this.socket.emit("join video chat", this.props.match.params.roomId, id);
      })

  
  }

    connectToNewUser(userId, stream) {
    
      const call = this.myPeer.call(userId, stream)
      const video = document.createElement('video')

      call.on('stream', userVideoStream => {

        this.addVideoStream(video, userVideoStream, userId)   
      })

      call.on('close', () => {
          video.remove()
          if(document.getElementById(userId)){
            document.getElementById(userId).remove();
          }
      })

      this.peers[userId] = call

      // let s = document.createElement('p')
      // s.innerHTML = 'hah'
      // this.videoGrid.current.appendChild(s)
     
    }

    addVideoStream(video, stream, userId=null) {

      video.srcObject = stream 
      video.addEventListener('loadedmetadata', () => {
   
        // setTimeout(()=> video.play(), 3000)
        video.play()
      })

      // console.log(call, stream)
      
      if(!this.state.ids.includes(userId)){
        debugger
        this.state.ids.push(userId)
        
        let s = document.createElement('p');
        s.innerHTML = this.props.friends[userId];
        s.className = "friend-video-username";
        s.setAttribute("id", userId)
        this.videoGrid.current.appendChild(s);
      }

      this.videoGrid.current.appendChild(video)
    }

    leaveMeeting(){

        // window.location.reload();
        const video = document.querySelector('video');
  
        const mediaStream = video.srcObject;
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop())
        this.socket.disconnect()
        this.myPeer.destroy(); 

        this.props.history.push("/")
    }
  
  render(){
    const myVideo = <video ref={this.videoRef}></video>
      return (
        <div>
            <h1>{this.props.room}</h1>
            <div id="videos-container" ref={this.videoGrid} >
                <p className="video-username"> {this.props.user.username}</p>
                {myVideo}
            </div>
            
            <button onClick={this.leaveMeeting}>Leave Meeting</button>
        </div>
      )
  }
}
