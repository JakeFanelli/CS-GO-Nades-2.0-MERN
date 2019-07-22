import React, { Component } from "react";
import DATA from "../data/mapData";

class MapDropdown extends Component {
  populateOptions = () => {
    let options = [];
    DATA.forEach(mapObj => {
      options.push(
        <option value={mapObj.mapTitle} key={mapObj.mapTitle}>
          {mapObj.mapTitle}
        </option>
      );
    });
    return options;
  };

  render() {
    return (
      <React.Fragment>
        <label className="label">Map:</label>
        <select
          value={this.props.mapChoice}
          onChange={this.props.handleMapChange}
          className="form-control"
        >
          {this.populateOptions()}
        </select>
      </React.Fragment>
    );
  }
}

export default MapDropdown;
