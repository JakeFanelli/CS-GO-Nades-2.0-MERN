import React, { Component } from "react";
import DATA from "../data/mapData";
import FilterBar from "./FilterBar";
import Loader from "./Loader";
import axios from "axios";
import { URL } from "../helpers";
import MapOverlay from "./MapOverlay";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapImage: "",
      mapTitle: "",
      mapAlt: "",
      loaded: "",
      visibility: "invisible",
      nadeData: []
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
    //api endpoint to load nades
    axios(`${URL}/loadNades`, {
      method: "post",
      withCredentials: true,
      data: {
        mapTitle: this.props.match.params.id
      }
    }).then(res => {
      if (res.data) {
        this.setState({ nadeData: res.data });
      }
    });
  }

  loaded = () => {
    this.setState({ loaded: true, visibility: "visible" });
  };

  render() {
    return (
      <div className="container">
        <Loader loaded={this.state.loaded} />
        <div className={this.state.visibility}>
          <h2 className="mapTitle">{this.state.mapTitle}</h2>
          <FilterBar
            tOrCt={this.props.tOrCt}
            switchSides={this.props.switchSides}
            smokesFlag={this.props.smokesFlag}
            flashesFlag={this.props.flashesFlag}
            molotovsFlag={this.props.molotovsFlag}
            smokesFlagUpdate={this.props.smokesFlagUpdate}
            flashesFlagUpdate={this.props.flashesFlagUpdate}
            molotovsFlagUpdate={this.props.molotovsFlagUpdate}
          />
          <MapOverlay
            match={this.props.match}
            mapImage={this.state.mapImage}
            mapAlt={this.state.mapAlt}
            loaded={this.loaded}
            tOrCt={this.props.tOrCt}
            nadeData={this.state.nadeData}
            smokesFlag={this.props.smokesFlag}
            flashesFlag={this.props.flashesFlag}
            molotovsFlag={this.props.molotovsFlag}
            show={true}
          />
        </div>
      </div>
    );
  }
}

export default MapPage;
