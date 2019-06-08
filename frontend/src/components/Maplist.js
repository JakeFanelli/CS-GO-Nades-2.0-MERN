import React, { Component } from "react";
import Map from "./Map";
import DATA from "../data/mapData";
import ReactLoading from "react-loading";

class Maplist extends Component {
  constructor(props) {
    super(props);
    this.state = { maps: DATA, mapList: [], loaded: false };
    this.state.maps.map((map, index) => {
      return this.state.mapList.push(
        <Map key={index} mapTitle={map.mapTitle} src={map.src} />
      );
    });
    this.state.mapList.forEach(map => {
      console.log(map);
    });
  }

  render() {
    if (this.state.loaded === true) {
      return <div className="row">{this.state.mapList}</div>;
    } else {
      return (
        <ReactLoading
          type={"spin"}
          color={"#000"}
          height={"30%"}
          width={"30%"}
        />
      );
    }
  }
}

export default Maplist;
