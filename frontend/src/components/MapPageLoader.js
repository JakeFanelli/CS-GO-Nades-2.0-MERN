import React, { Component } from "react";
import ReactLoading from "react-loading";

class MapPageLoader extends Component {
  render() {
    if (this.props.icon === "list") {
      if (
        this.props.nadesLoaded === "nadesLoadedTrue" &&
        this.props.imageLoaded === "imageLoadedTrue"
      ) {
        return null;
      } else {
        return (
          <ReactLoading
            className="middle"
            type={"spin"}
            color={"#fff"}
            height={"4%"}
            width={"4%"}
          />
        );
      }
    } else {
      if (
        this.props.nadesLoaded === "nadesLoadedTrue" &&
        this.props.authorsLoaded === "authorsLoadedTrue"
      ) {
        return null;
      } else {
        return (
          <ReactLoading
            className="middle"
            type={"spin"}
            color={"#fff"}
            height={"4%"}
            width={"4%"}
          />
        );
      }
    }
  }
}

export default MapPageLoader;
