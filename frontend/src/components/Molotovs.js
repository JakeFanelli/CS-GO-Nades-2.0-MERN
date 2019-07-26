import React, { Component } from "react";
import { Link } from "react-router-dom";
import MolotovSVG from "./MolotovSVG";

class Molotovs extends Component {
  createSmokeLines = () => {
    let smokeLines = [];
    this.props.nadeData.forEach(nade => {
      smokeLines.push(
        <Link key={nade._id} to={this.props.match.params.id + "/" + nade._id}>
          <MolotovSVG
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
    if (this.props.molotovsFlag) {
      return this.createSmokeLines();
    } else {
      return null;
    }
  }
}

export default Molotovs;
