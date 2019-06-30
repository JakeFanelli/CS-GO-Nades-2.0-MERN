import React, { Component } from "react";
import NadeFilter from "./NadeFilter";
import Switch from "./Switch";

class FilterBar extends Component {
  render() {
    return (
      <div id="filterRow" className="row">
        <div id="filterCol" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <NadeFilter />
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
