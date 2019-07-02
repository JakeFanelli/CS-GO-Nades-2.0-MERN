import React, { Component } from "react";
import { Link } from "react-router-dom";
import NADE_DATA from "../data/nadeData";

class Smokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nades: []
    };
    NADE_DATA.forEach(nade => {
      if (nade.type === "Smoke") {
        this.state.nades.push(
          <Link key={nade.id} to={this.props.match.params.id + "/" + nade.id}>
            <g>
              <line
                x1={nade.startX}
                x2={nade.endX}
                y1={nade.startY}
                y2={nade.endY}
              />
              <circle cx={nade.startX} cy={nade.startY} r="1" />
              <circle cx={nade.endX + 1} cy={nade.endY} r="1.5" />
              <circle cx={nade.endX - 1} cy={nade.endY} r="1.5" />
              <circle cx={nade.endX} cy={nade.endY - 1} r="1.5" />
              <circle cx={nade.endX} cy={nade.endY + 1} r="1.5" />
            </g>
          </Link>
        );
      }
    });
  }

  render() {
    return this.state.nades;
  }
}

export default Smokes;
