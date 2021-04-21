import React from "react";
import openSocket from "socket.io-client";

export class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.socket = openSocket("http://localhost:5000", {
      transports: ["websocket"],
    });

  }
  
  render(){
      return (
        <div>
            <h1>video chat</h1>
            <video src="">video</video>
        </div>
      )
    
  }

}
