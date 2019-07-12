import React, { Component } from "react";
import { Link } from "react-router-dom";

class Flashes extends Component {
  createSmokeLines = () => {
    let smokeLines = [];
    this.props.nadeData.forEach(nade => {
      smokeLines.push(
        <Link key={nade._id} to={this.props.match.params._id + "/" + nade._id}>
          <g>
            <line
              x1={nade.startX}
              x2={nade.endX}
              y1={nade.startY}
              y2={nade.endY}
            />
            <circle cx={nade.startX} cy={nade.startY} r="1" />
            <image href="../flash.png" x={nade.endX} y={nade.endY} />
          </g>
        </Link>
      );
    });
    return smokeLines;
  };

  render() {
    if (this.props.flashesFlag) {
      return this.createSmokeLines();
    } else {
      return null;
    }
  }
}

export default Flashes;
