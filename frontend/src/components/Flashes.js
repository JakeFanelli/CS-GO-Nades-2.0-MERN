import React, { Component } from "react";
import { Link } from "react-router-dom";
import FlashSVG from "./FlashSVG";

class Flashes extends Component {
  createSmokeLines = () => {
    let smokeLines = [];
    this.props.nadeData.forEach(nade => {
      smokeLines.push(
        <Link key={nade._id} to={this.props.match.params.id + "/" + nade._id}>
          <FlashSVG
            startX={nade.startX}
            startY={nade.startY}
            midX={nade.midX}
            midY={nade.midY}
            endX={nade.endX}
            endY={nade.endY}
            nadeClass={this.props.nadeClass}
            lines={nade.lines}
          />
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
