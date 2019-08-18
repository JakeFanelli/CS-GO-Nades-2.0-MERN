import React, { Component } from "react";

class RecoilImage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mapCol">
          <img
            className="img-responsive mapPic"
            src={this.props.recoilGif + ".gif"}
            alt={this.props.recoilAlt}
            onLoad={this.props.loaded}
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mapCol">
          <img
            className="img-responsive mapPic"
            src={this.props.recoilGif + "-1.gif"}
            alt={this.props.recoilAlt}
            onLoad={this.props.loaded}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default RecoilImage;
