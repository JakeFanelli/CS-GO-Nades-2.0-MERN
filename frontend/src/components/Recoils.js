import React, { Component } from "react";
import GunDropDown from "./GunDropdown";
import DATA from "../data/recoilData";
import RecoilImage from "./RecoilImage";

class Recoils extends Component {
  constructor(props) {
    super(props);
    this.handleGunChange = this.handleGunChange.bind(this);
  }
  state = {
    gunChoice: "AK-47",
    recoilGif: "../recoil_images/AK-47",
    recoilAlt: "AK-47"
  };
  handleGunChange(event) {
    this.setState({ gunChoice: event.target.value });
    DATA.forEach(gun => {
      if (gun.name === event.target.value) {
        this.setState({ recoilGif: gun.overlaysrc, recoilAlt: gun.alt });
      }
    });
  }
  render() {
    return (
      <div className="container">
        <h2>Recoil Patterns</h2>
        <div className="form-group">
          <GunDropDown
            handleGunChange={this.handleGunChange}
            gunChoice={this.state.gunChoice}
          />
        </div>
        <div className="row">
          <RecoilImage
            recoilGif={this.state.recoilGif}
            recoilAlt={this.state.recoilAlt}
          />
        </div>
      </div>
    );
  }
}

export default Recoils;
