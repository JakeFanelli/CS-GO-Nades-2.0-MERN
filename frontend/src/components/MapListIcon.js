import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MapListIcon extends Component {
  render() {
    return (
      <FontAwesomeIcon
        icon={this.props.icon}
        className={this.props.icon}
        onClick={this.props.toggleView}
        size="lg"
      />
    );
  }
}

export default MapListIcon;
