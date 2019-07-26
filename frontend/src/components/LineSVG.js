import React, { Component } from "react";

class LineSVG extends Component {
  render() {
    if (this.props.endX !== 0) {
      return (
        <line
          x1={this.props.startX}
          x2={this.props.endX}
          y1={this.props.startY}
          y2={this.props.endY}
        />
      );
    } else {
      return null;
    }
  }
}

export default LineSVG;
