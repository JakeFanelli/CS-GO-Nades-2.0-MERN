import React, { Component } from "react";
import StartSVG from "./StartSVG";
import LineSVG from "./LineSVG";

class SmokeSVG extends Component {
  render() {
    return (
      <g className={this.props.nadeClass}>
        <StartSVG startX={this.props.startX} startY={this.props.startY} />
        <LineSVG
          startX={this.props.startX}
          endX={this.props.endX}
          startY={this.props.startY}
          endY={this.props.endY}
        />
        <End endX={this.props.endX} endY={this.props.endY} />
      </g>
    );
  }
}

function End(props) {
  if (props.endX !== 0) {
    return (
      <React.Fragment>
        <circle cx={props.endX + 1} cy={props.endY} r="1.5" />
        <circle cx={props.endX - 1} cy={props.endY} r="1.5" />
        <circle cx={props.endX} cy={props.endY - 1} r="1.5" />
        <circle cx={props.endX} cy={props.endY + 1} r="1.5" />
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export default SmokeSVG;
