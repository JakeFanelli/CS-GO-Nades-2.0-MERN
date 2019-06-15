import React, { Component } from "react";
import { Link } from "react-router-dom";

class Map extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mapCol">
        <div className="imgContainer">
          <Link to={this.props.to} className="thumbnail">
            <img
              className="img-responsive mapPic"
              src={this.props.src}
              alt={this.props.alt}
              onLoad={this.props.loaded}
            />
          </Link>
          <div className="centered">
            <Link to={this.props.to} className="noLinkLook">
              <p className="h1">{this.props.mapTitle}</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Map;
