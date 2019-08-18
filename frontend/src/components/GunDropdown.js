import React, { Component } from "react";
import DATA from "../data/recoilData";

class GunDropDown extends Component {
  populateOptions = type => {
    let options = [];
    DATA.forEach(gun => {
      if (gun.type === type) {
        options.push(
          <option value={gun.name} key={gun.name}>
            {gun.name}
          </option>
        );
      }
    });
    return options;
  };

  render() {
    return (
      <React.Fragment>
        <label className="label">Gun:</label>
        <select
          value={this.props.gunChoice}
          onChange={this.props.handleGunChange}
          className="form-control"
        >
          <optgroup label="Rifles">{this.populateOptions("rifle")}</optgroup>
          <optgroup label="SMGs">{this.populateOptions("smg")}</optgroup>
        </select>
      </React.Fragment>
    );
  }
}

export default GunDropDown;
