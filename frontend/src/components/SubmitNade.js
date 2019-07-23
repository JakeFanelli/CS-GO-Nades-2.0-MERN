import React, { Component } from "react";
import MapDropdown from "./MapDropdown";
import MapOverlay from "./MapOverlay";
import DATA from "../data/mapData";
import RadioButtonsForType from "./RadioButtonsForType";

class SubmitNade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapChoice: "Mirage",
      mapImage: "",
      mapAlt: "",
      nadeTitle: "",
      selectedOption: "Smoke"
    };
    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    DATA.forEach(mapObj => {
      if (mapObj.mapTitle === this.state.mapChoice) {
        this.setState({ mapImage: mapObj.overlaysrc, mapAlt: mapObj.mapAlt });
      }
    });
  }

  handleMapChange(event) {
    this.setState({ mapChoice: event.target.value });
    DATA.forEach(mapObj => {
      if (mapObj.mapTitle === event.target.value) {
        this.setState({ mapImage: mapObj.overlaysrc, mapAlt: mapObj.mapAlt });
      }
    });
  }

  handleSubmit(event) {
    alert("submitted");
    event.preventDefault();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mapTitle">Submit your own</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <MapDropdown
              handleMapChange={this.handleMapChange}
              mapChoice={this.state.mapChoice}
            />
          </div>
          <div className="form-group">
            <label className="label">Title: </label>
            <input
              className="form-control"
              type="text"
              name="nadeTitle"
              value={this.state.nadeTitle}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <RadioButtonsForType
              selectedOption={this.state.selectedOption}
              handleChange={this.handleChange}
            />
            <MapOverlay
              show={false}
              mapImage={this.state.mapImage}
              mapAlt={this.state.mapAlt}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SubmitNade;
