import React, { Component } from "react";
import DATA from "../data/mapData";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapImage: "",
      mapTitle: "",
      mapAlt: "",
      mapList: []
    };
  }

  componentWillMount() {
    DATA.forEach(mapObj => {
      let uppercaseMapTitle =
        this.props.match.params.id.charAt(0).toUpperCase() +
        this.props.match.params.id.slice(1);
      if (
        uppercaseMapTitle.substring(0, 4) === mapObj.mapTitle.substring(0, 4)
      ) {
        this.setState({
          mapTitle: mapObj.mapTitle,
          mapImage: mapObj.overlaysrc,
          mapAlt: mapObj.alt
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h2>{this.state.mapTitle}</h2>
        <div id="contentContainer" className="">
          <div id="mapRow" className="row">
            <div
              id="mapCol"
              className="col-xs-12 col-sm-12 col-md-12 col-lg-12"
            >
              <img
                id="imgBox"
                className="img-responsive overlay"
                src={this.state.mapImage}
                alt={this.state.mapAlt}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapPage;
