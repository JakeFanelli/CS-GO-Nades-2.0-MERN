import React, { Component } from "react";
import DATA from "../data/mapData";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapImage: "",
      mapTitle: "",
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
          mapTitle: mapObj.mapTitle
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h2>{this.state.mapTitle}</h2>
      </div>
    );
  }
}

export default MapPage;
