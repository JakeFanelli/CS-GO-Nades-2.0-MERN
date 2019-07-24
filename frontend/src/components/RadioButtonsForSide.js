import React, { Component } from "react";

class RadioButtonsForSide extends Component {
  render() {
    return (
      <React.Fragment>
        <label className="label">Side: </label>
        <br />
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              value="T"
              name="selectedSideOption"
              checked={this.props.selectedSideOption === "T"}
              onChange={this.props.handleChange}
            />
            T
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              value="CT"
              name="selectedSideOption"
              checked={this.props.selectedSideOption === "CT"}
              onChange={this.props.handleChange}
            />
            CT
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default RadioButtonsForSide;
