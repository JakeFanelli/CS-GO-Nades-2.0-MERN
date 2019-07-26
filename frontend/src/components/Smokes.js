import React, { Component } from "react";
import { Link } from "react-router-dom";
import SmokeSVG from "./SmokeSVG";

class Smokes extends Component {
  createSmokeLines = () => {
    let smokeLines = [];
    this.props.nadeData.forEach(nade => {
      smokeLines.push(
        <Link key={nade._id} to={this.props.match.params.id + "/" + nade._id}>
          <SmokeSVG
            startX={nade.startX}
            startY={nade.startY}
            endX={nade.endX}
            endY={nade.endY}
            nadeClass={this.props.nadeClass}
          />
        </Link>
      );
    });
    return smokeLines;
  };

  render() {
    if (this.props.smokesFlag) {
      return this.createSmokeLines();
    } else {
      return null;
    }
  }
}

export default Smokes;
