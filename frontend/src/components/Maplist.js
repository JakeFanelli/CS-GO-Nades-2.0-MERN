import React, { Component } from "react";
import Map from "./Map";
import DATA from "../data/mapData";
import Loader from "./Loader";

class Maplist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: DATA,
      mapList: [],
      loaded: false,
      loadedCounter: 0,
      visibility: "row invisible"
    };
    this.loaded = this.loaded.bind(this);
    this.state.maps.map((map, index) => {
      return this.state.mapList.push(
        <Map
          key={index}
          mapTitle={map.mapTitle}
          src={map.src}
          alt={map.alt}
          to={map.to}
          loaded={this.loaded}
        />
      );
    });
  }

  loaded = () => {
    this.setState({ loadedCounter: this.state.loadedCounter + 1 });
    if (this.state.loadedCounter === 6) {
      this.setState({ loaded: true, visibility: "row" });
    }
  };

  render() {
    return (
      <div>
        <Loader loaded={this.state.loaded} />
        <div className={this.state.visibility}>{this.state.mapList}</div>
      </div>
    );
  }
}

export default Maplist;
