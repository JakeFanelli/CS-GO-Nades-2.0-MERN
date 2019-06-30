import React, { Component } from "react";
import DATA from "../data/mapData";
import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";
import NADE_DATA from "../data/nadeData";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapImage: "",
      mapTitle: "",
      mapAlt: "",
      nades: []
    };
    let classer = "";
    NADE_DATA.forEach(nade => {
      if (nade.type === "Smoke") {
        classer = "smokes";
      }
      this.state.nades.push(
        <Link key={nade.id} to={this.props.match.params.id + "/" + nade.id}>
          <g className="smokes t tsmoke">
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
    });
  }

  componentWillMount() {
    DATA.forEach(mapObj => {
      let uppercaseMapTitle =
        this.props.match.params.id.charAt(0).toUpperCase() +
        this.props.match.params.id.slice(1);
      if (
        uppercaseMapTitle.substring(0, 4) === mapObj.mapTitle.substring(0, 4)
      ) {
        this.setState({
          mapTitle: mapObj.mapTitle,
          mapImage: mapObj.overlaysrc,
          mapAlt: mapObj.alt
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="mapTitle">{this.state.mapTitle}</h2>
        <FilterBar
          tOrCt={this.props.tOrCt}
          switchSides={this.props.switchSides}
        />
        <div id="contentContainer" className="">
          <div id="mapRow" className="row">
            <div
              id="mapCol"
              className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
            >
              <img
                id="imgBox"
                className="img-responsive overlay"
                src={this.state.mapImage}
                alt={this.state.mapAlt}
              />
              <svg
                className="svgClass"
                viewBox="0 0 250 250"
                preserveAspectRatio="none"
              >
                {this.state.entry}
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapPage;
