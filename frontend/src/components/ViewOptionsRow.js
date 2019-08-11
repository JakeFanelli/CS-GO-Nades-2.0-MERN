import React, { Component } from "react";
import MapListIcon from "./MapListIcon";

class ViewOptionsRow extends Component {
  render() {
    return (
      <div className="row viewOptionsRow">
        <div className="viewOptionsCol col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <input
            type="checkbox"
            className="form-check-input userSubmissionCheck"
            name="userSubmissions"
            onChange={this.props.userSubmissionFlagUpdate}
            checked={this.props.userSubmissionFlag}
          />
          <label className="userSubmissionLabel" htmlFor="userSubmissions">
            User Submissions
          </label>
          <MapListIcon
            icon={this.props.icon}
            toggleView={this.props.toggleView}
          />
        </div>
      </div>
    );
  }
}

export default ViewOptionsRow;
