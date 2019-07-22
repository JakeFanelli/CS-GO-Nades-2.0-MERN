import React, { Component } from "react";
import BothNades from "./BothNades";

class MapOverlay extends Component {
  render() {
    return (
      <div id="contentContainer">
        <div id="mapRow" className="row">
          <div id="mapCol" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <img
              id="imgBox"
              className="img-responsive overlay"
              src={this.props.mapImage}
              alt={this.props.mapAlt}
              onLoad={this.props.loaded}
            />
            <svg
              className="svgClass"
              viewBox="0 0 250 250"
              preserveAspectRatio="none"
            >
              <BothNades
                match={this.props.match}
                tOrCt={this.props.tOrCt}
                nadeData={this.props.nadeData}
                smokesFlag={this.props.smokesFlag}
                flashesFlag={this.props.flashesFlag}
                molotovsFlag={this.props.molotovsFlag}
                show={this.props.show}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default MapOverlay;
