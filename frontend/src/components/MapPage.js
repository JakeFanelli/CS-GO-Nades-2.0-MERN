import React, { Component } from "react";
import DATA from "../data/mapData";
import MapPageLoader from "./MapPageLoader";
import axios from "axios";
import { URL } from "../helpers";
import NoMatch from "./NoMatch";
import ViewOptionsRow from "./ViewOptionsRow";
import FilterBar from "./FilterBar";
import MapListView from "./MapListView";
import MapOverlay from "./MapOverlay";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapImage: "",
      mapTitle: "",
      mapAlt: "",
      loaded: "",
      showNoMatchComponent: false,
      nadesLoaded: "nadesLoadedFalse",
      authorsLoaded: "authorsLoadedFalse",
      imageLoaded: "imageLoadedFalse"
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
          showNoMatchComponent: false
        });
        break;
      } else {
        this.setState({
          showNoMatchComponent: true
        });
      }
    }
    if (!this.props.userSubmissionFlag) {
      var apiCall = "loadNades";
    } else {
      apiCall = "loadUnverifiedNades";
    }
    //api endpoint to load nades
    axios(`${URL}/${apiCall}`, {
      method: "post",
      withCredentials: true,
      data: {
        mapTitle: this.props.match.params.id
      }
    }).then(res => {
      this.props.updateNadeData(res.data);
      this.setState({
        nadesLoaded: "nadesLoadedTrue"
      });
      axios(`${URL}/getAuthorUserNames`, {
        method: "post",
        withCredentials: true,
        data: {
          data: res.data
        }
      }).then(res => {
        if (res.data) {
          this.props.updateNadeData(res.data);
          this.setState({
            authorsLoaded: "authorsLoadedTrue"
          });
        }
      });
    });
  }

  userSubmissionFlagUpdate = () => {
    if (this.props.userSubmissionFlag) {
      var apiCall = "loadNades";
    } else {
      apiCall = "loadUnverifiedNades";
    }
    this.setState({
      loaded: false,
      visibility: "invisible"
    });
    axios(`${URL}/${apiCall}`, {
      method: "post",
      withCredentials: true,
      data: {
        mapTitle: this.props.match.params.id
      }
    }).then(res => {
      this.props.updateNadeData(res.data);
      if (this.props.icon === "list") {
        this.setState({
          loaded: true,
          visibility: "visible"
        });
      }
      axios(`${URL}/getAuthorUserNames`, {
        method: "post",
        withCredentials: true,
        data: {
          data: res.data
        }
      }).then(res => {
        if (res.data) {
          this.props.updateNadeData(res.data);
          this.setState({
            loaded: true,
            visibility: "visible"
          });
        }
      });
    });
    this.props.userSubmissionFlagUpdate();
  };

  onLoad = () => {
    this.setState({
      imageLoaded: "imageLoadedTrue"
    });
  };

  render() {
    if (this.state.showNoMatchComponent) {
      return <NoMatch />;
    } else {
      return (
        <div className="container">
          <h2 className="mapTitle">{this.state.mapTitle}</h2>
          <MapPageLoader
            nadesLoaded={this.state.nadesLoaded}
            authorsLoaded={this.state.authorsLoaded}
            imageLoaded={this.state.imageLoaded}
            icon={this.props.icon}
          />
          <div
            className={
              this.props.icon +
              this.state.nadesLoaded +
              this.state.authorsLoaded +
              this.state.imageLoaded
            }
          >
            <ViewOptionsRow
              icon={this.props.icon}
              toggleView={this.props.toggleView}
              userSubmissionFlag={this.props.userSubmissionFlag}
              userSubmissionFlagUpdate={this.userSubmissionFlagUpdate}
            />
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
              nadeData={this.props.nadeData}
              smokesFlag={this.props.smokesFlag}
              flashesFlag={this.props.flashesFlag}
              molotovsFlag={this.props.molotovsFlag}
            />
            <MapOverlay
              match={this.props.match}
              mapImage={this.state.mapImage}
              mapAlt={this.state.mapAlt}
              onLoad={this.onLoad}
              tOrCt={this.props.tOrCt}
              nadeData={this.props.nadeData}
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
