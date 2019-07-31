import React, { Component } from "react";
import StartSVG from "./StartSVG";
import LineSVG from "./LineSVG";

class MolotovsSVG extends Component {
  render() {
    return (
      <g className={this.props.nadeClass}>
        <StartSVG startX={this.props.startX} startY={this.props.startY} />
        <LineSVG
          startX={this.props.startX}
          endX={this.props.endX}
          midX={this.props.midX}
          midY={this.props.midY}
          startY={this.props.startY}
          endY={this.props.endY}
          lines={this.props.lines}
        />
        <End endX={this.props.endX} endY={this.props.endY} />
      </g>
    );
  }
}

function End(props) {
  if (props.endX !== 0) {
    return <image href="../molly.png" x={props.endX} y={props.endY} />;
  } else {
    return null;
  }
}

export default MolotovsSVG;
