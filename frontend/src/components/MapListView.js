import React, { Component } from "react";

class MapListView extends Component {
  render() {
    if (this.props.icon === "map") {
      return <p>coming soon</p>;
    } else {
      return null;
    }
  }
}

export default MapListView;
