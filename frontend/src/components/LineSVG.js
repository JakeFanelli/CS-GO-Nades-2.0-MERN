import React, { Component } from "react";

class LineSVG extends Component {
  render() {
    if (this.props.lines === "1") {
      if (this.props.endX !== 0) {
        return (
          <line
            x1={this.props.startX}
            x2={this.props.endX}
            y1={this.props.startY}
            y2={this.props.endY}
          />
        );
      }
    } else if (this.props.lines === "2") {
      if (this.props.midX !== 0 && this.props.endX === 0) {
        return (
          <line
            x1={this.props.startX}
            x2={this.props.midX}
            y1={this.props.startY}
            y2={this.props.midY}
          />
        );
      } else if (this.props.midX !== 0 && this.props.endX !== 0) {
        return (
          <React.Fragment>
            <line
              x1={this.props.startX}
              x2={this.props.midX}
              y1={this.props.startY}
              y2={this.props.midY}
            />
            <circle cx={this.props.midX} cy={this.props.midY} r=".001" />
            <line
              x1={this.props.midX}
              x2={this.props.endX}
              y1={this.props.midY}
              y2={this.props.endY}
            />
          </React.Fragment>
        );
      } else if (this.props.endX !== 0) {
        return (
          <line
            x1={this.props.startX}
            x2={this.props.endX}
            y1={this.props.startY}
            y2={this.props.endY}
          />
        );
      }
    }
    if (this.props.endX !== 0) {
    } else {
      return null;
    }
  }
}

export default LineSVG;
