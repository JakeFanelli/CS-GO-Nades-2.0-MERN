import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ThumbIcon extends Component {
  render() {
    return (
      <FontAwesomeIcon
        icon={this.props.icon}
        className={this.props.classname}
        onClick={this.props.toggleView}
        size="lg"
      />
    );
  }
}

export default ThumbIcon;
