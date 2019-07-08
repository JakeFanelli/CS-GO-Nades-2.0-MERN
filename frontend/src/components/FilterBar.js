import React, { Component } from "react";
import NadeFilter from "./NadeFilter";
import Switch from "./Switch";

class FilterBar extends Component {
  render() {
    return (
      <div id="filterRow" className="row">
        <div id="filterCol" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <NadeFilter
            smokesFlag={this.props.smokesFlag}
            flashesFlag={this.props.flashesFlag}
            molotovsFlag={this.props.molotovsFlag}
            smokesFlagUpdate={this.props.smokesFlagUpdate}
            flashesFlagUpdate={this.props.flashesFlagUpdate}
            molotovsFlagUpdate={this.props.molotovsFlagUpdate}
          />
          <Switch
            tOrCt={this.props.tOrCt}
            switchSides={this.props.switchSides}
          />
        </div>
      </div>
    );
  }
}

export default FilterBar;
