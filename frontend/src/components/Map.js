import React, { Component } from "react";
import { Link } from "react-router-dom";

class Map extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mapCol">
        <div className="imgContainer">
          <Link className="thumbnail" to="">
            <img
              className="img-responsive mapPic"
              src={this.props.src}
              alt="Mirage"
            />
          </Link>
          <div className="centered">
            <Link className="noLinkLook" to="">
              <p className="h1">{this.props.mapTitle}</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
