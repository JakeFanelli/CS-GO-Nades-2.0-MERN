import React, { Component } from "react";
import { Link } from "react-router-dom";

class Molotovs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nades: []
    };
    this.props.nadeData.forEach(nade => {
      if (nade.type === "Molotov") {
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
              <image href="../molly.png" x={nade.endX} y={nade.endY} />
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

export default Molotovs;
