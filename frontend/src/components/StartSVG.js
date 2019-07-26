import React, { Component } from "react";

class StartSVG extends Component {
  render() {
    return <circle cx={this.props.startX} cy={this.props.startY} r="1" />;
  }
}

export default StartSVG;
