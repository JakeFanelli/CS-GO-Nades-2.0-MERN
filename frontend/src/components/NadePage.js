import React, { Component } from "react";

class NadePage extends Component {
  state = {
    videoURL: ""
  };
  render() {
    return (
      <video controls>
        <source src={this.state.videoURL} />
      </video>
    );
  }
}

export default NadePage;
