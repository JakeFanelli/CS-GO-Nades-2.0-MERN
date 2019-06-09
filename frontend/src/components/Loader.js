import React, { Component } from "react";
import ReactLoading from "react-loading";

class Loader extends Component {
  render() {
    if (this.props.loaded) {
      return null;
    } else {
      return (
        <ReactLoading
          className="middle"
          type={"spin"}
          color={"#000"}
          height={"4%"}
          width={"4%"}
        />
      );
    }
  }
}

export default Loader;
