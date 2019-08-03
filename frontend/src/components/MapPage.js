import React, { Component } from "react";
import DATA from "../data/mapData";
import FilterBar from "./FilterBar";
import Loader from "./Loader";
import axios from "axios";
import { URL } from "../helpers";
import MapOverlay from "./MapOverlay";
import NoMatch from "./NoMatch";
import MapListIcon from "./MapListIcon";
import MapListView from "./MapListView";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapImage: "",
      mapTitle: "",
      mapAlt: "",
      loaded: "",
      visibility: "invisible",
      nadeData: [],
      showNoMatchComponent: false
    };
  }

  componentWillMount() {
    for (let mapObj of DATA) {
      let uppercaseMapTitle =
        this.props.match.params.id.charAt(0).toUpperCase() +
        this.props.match.params.id.slice(1);
      if (
        uppercaseMapTitle.substring(0, 4) === mapObj.mapTitle.substring(0, 4)
      ) {
        this.setState({
          mapTitle: mapObj.mapTitle,
          mapImage: mapObj.overlaysrc,
          mapAlt: mapObj.alt,
          showNoMatchComponent: false,
          loaded: false
        });
        break;
      } else {
        this.setState({
          showNoMatchComponent: true,
          loaded: true
        });
      }
    }
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
    if (this.props.icon === "map") {
      this.setState({
        loaded: true,
        visibility: "visible"
      });
    }
  }

  loaded = () => {
    this.setState({ loaded: true, visibility: "visible" });
  };

  render() {
    if (this.state.showNoMatchComponent) {
      return <NoMatch />;
    } else {
      return (
        <div className="container">
          <Loader loaded={this.state.loaded} />
          <div className={this.state.visibility}>
            <div className="row">
              <h2 className="mapTitle col">{this.state.mapTitle}</h2>
              <div className="col iconDiv">
                <MapListIcon
                  icon={this.props.icon}
                  toggleView={this.props.toggleView}
                />
              </div>
            </div>
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
            <MapListView
              match={this.props.match}
              icon={this.props.icon}
              tOrCt={this.props.tOrCt}
              nadeData={this.state.nadeData}
              smokesFlag={this.props.smokesFlag}
              flashesFlag={this.props.flashesFlag}
              molotovsFlag={this.props.molotovsFlag}
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
              nadeClass={"loadedNades"}
              icon={this.props.icon}
            />
          </div>
        </div>
      );
    }
  }
}

export default MapPage;
