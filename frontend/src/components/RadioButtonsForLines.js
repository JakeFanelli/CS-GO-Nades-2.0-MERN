import React, { Component } from "react";

class RadioButtonsForLines extends Component {
  render() {
    return (
      <React.Fragment>
        <label className="label">Lines: </label>
        <br />
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              value="1"
              name="lines"
              checked={this.props.lines === "1"}
              onChange={this.props.handleChange}
            />
            1
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              value="2"
              name="lines"
              checked={this.props.lines === "2"}
              onChange={this.props.handleChange}
            />
            2
          </label>
        </div>
      </React.Fragment>
    );
  }
}

export default RadioButtonsForLines;
