import React, { Component } from "react";
import BothNades from "./BothNades";
import NadesSVG from "./NadesSVG";

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
              id="svgID"
              className="svgClass"
              viewBox="0 0 250 250"
              preserveAspectRatio="none"
              onClick={this.props.mouseClicker}
            >
              <BothNades
                match={this.props.match}
                tOrCt={this.props.tOrCt}
                nadeData={this.props.nadeData}
                smokesFlag={this.props.smokesFlag}
                flashesFlag={this.props.flashesFlag}
                molotovsFlag={this.props.molotovsFlag}
                show={this.props.show}
                nadeClass={this.props.nadeClass}
              />
              <NadesSVG
                showUserNade={this.props.showUserNade}
                startX={this.props.startX}
                startY={this.props.startY}
                endX={this.props.endX}
                endY={this.props.endY}
                selectedOption={this.props.selectedOption}
                nadeClass={this.props.nadeClass}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default MapOverlay;
