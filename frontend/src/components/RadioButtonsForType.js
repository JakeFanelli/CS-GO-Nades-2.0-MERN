import React, { Component } from "react";

class RadioButtonsForType extends Component {
  render() {
    return (
      <React.Fragment>
        <label className="label">Type: </label>
        <br />
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              value="Smoke"
              name="selectedOption"
              checked={this.props.selectedOption === "Smoke"}
              onChange={this.props.handleChange}
            />
            Smoke
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              value="Flash"
              name="selectedOption"
              checked={this.props.selectedOption === "Flash"}
              onChange={this.props.handleChange}
            />
            Flash
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              value="Molotov"
              name="selectedOption"
              checked={this.props.selectedOption === "Molotov"}
              onChange={this.props.handleChange}
            />
            Molotov
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default RadioButtonsForType;
