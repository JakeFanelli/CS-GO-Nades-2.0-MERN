import React, { Component } from "react";

class Switch extends Component {
  render() {
    return (
      <label id="switch" className="switch">
        <input
          onChange={this.props.switchSides}
          type="checkbox"
          name="sideSwitch"
          checked={this.props.tOrCt === "T" ? false : true}
        />
        <span className="slider">
          <span id={this.props.tOrCt}>{this.props.tOrCt}</span>
        </span>
      </label>
    );
  }
}

export default Switch;
