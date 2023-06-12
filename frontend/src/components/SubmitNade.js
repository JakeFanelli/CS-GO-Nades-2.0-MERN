import React, { Component } from "react";
import MapDropdown from "./MapDropdown";
import MapOverlay from "./MapOverlay";
import DATA from "../data/mapData";
import RadioButtonsForType from "./RadioButtonsForType";
import RadioButtonsForSide from "./RadioButtonsForSide";
import RadioButtonsForLines from "./RadioButtonsForLines";
import TextInput from "./TextInput";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { URL } from "../helpers";
import { Link } from "react-router-dom";

class SubmitNade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapChoice: "Mirage",
      mapImage: "",
      mapAlt: "",
      nadeTitle: "",
      nadeURL: "",
      selectedOption: "Smoke",
      selectedSideOption: "T",
      startX: 0,
      startY: 0,
      midX: 0,
      midY: 0,
      endX: 0,
      endY: 0,
      starterFlag: true,
      midFlag: false,
      lines: "1"
    };
    this.handleMapChange = this.handleMapChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    DATA.forEach((mapObj) => {
      if (mapObj.mapTitle === this.state.mapChoice) {
        this.setState({ mapImage: mapObj.overlaysrc, mapAlt: mapObj.mapAlt });
      }
    });
  }

  handleMapChange(event) {
    this.setState({ mapChoice: event.target.value });
    DATA.forEach((mapObj) => {
      if (mapObj.mapTitle === event.target.value) {
        this.setState({ mapImage: mapObj.overlaysrc, mapAlt: mapObj.mapAlt });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var mapChoiceAdjusted;
    if (this.state.mapChoice === "Dust ll") {
      mapChoiceAdjusted = "dust2";
    } else {
      mapChoiceAdjusted = this.state.mapChoice;
    }
    axios(`${URL}/submitNade`, {
      method: "post",
      withCredentials: true,
      data: {
        mapChoice:
          mapChoiceAdjusted.charAt(0).toLowerCase() +
          mapChoiceAdjusted.slice(1),
        nadeTitle: this.state.nadeTitle,
        nadeURL: this.state.nadeURL,
        selectedOption: this.state.selectedOption,
        selectedSideOption: this.state.selectedSideOption,
        startX: this.state.startX,
        startY: this.state.startY,
        midX: this.state.midX,
        midY: this.state.midY,
        endX: this.state.endX,
        endY: this.state.endY,
        lines: this.state.lines,
        loggedIn: this.props.loggedIn
      }
    })
      .then((res) => {
        this.setState({
          nadeTitle: "",
          nadeURL: "",
          startX: 0,
          startY: 0,
          midX: 0,
          midY: 0,
          endX: 0,
          endY: 0,
          starterFlag: true
        });
        NotificationManager.success("Pending approval!", "Success!", 4000);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.errors) {
            error.response.data.errors.map((err) => {
              return NotificationManager.error(err.msg, "Error", 4000);
            });
          }
        } else {
          NotificationManager.error(error.toString(), "Error", 4000);
        }
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  mouseClicker = (event) => {
    var root = document.getElementById("svgID");
    var uupos = root.createSVGPoint();
    uupos.x = event.clientX;
    uupos.y = event.clientY;
    var ctm = event.target.getScreenCTM();
    if ((ctm = ctm.inverse())) {
      uupos = uupos.matrixTransform(ctm);
    }
    let x = Math.floor(uupos.x);
    let y = Math.floor(uupos.y);
    if (this.state.starterFlag) {
      this.setState({
        startX: x,
        startY: y,
        starterFlag: false,
        midFlag: true
      });
    } else if (this.state.midFlag && this.state.lines === "2") {
      this.setState({ midX: x, midY: y, midFlag: false });
    } else {
      this.setState({ endX: x, endY: y, starterFlag: true });
    }
  };

  switchSides = () => {
    this.state.lines === 1
      ? this.setState({ lines: 2 })
      : this.setState({ lines: 1 });
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
            <TextInput
              inputText={this.state.nadeTitle}
              name="nadeTitle"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label className="label">Gfycat/YouTube URL:</label>
            <Link to="/gfycat" className="forgotPassword">
              What's this?
            </Link>
            <TextInput
              inputText={this.state.nadeURL}
              name="nadeURL"
              onChange={this.handleChange}
              placeholder={"https://www.youtube.com/embed/UCKJ5w81MjM"}
            />
          </div>
          <div className="form-group">
            <RadioButtonsForType
              selectedOption={this.state.selectedOption}
              handleChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <RadioButtonsForSide
              selectedSideOption={this.state.selectedSideOption}
              handleChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <RadioButtonsForLines
              lines={this.state.lines}
              handleChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Submit Nade
            </button>
          </div>
          <div className="form-group">
            <MapOverlay
              show={false}
              showUserNade={true}
              mapImage={this.state.mapImage}
              mapAlt={this.state.mapAlt}
              mouseClicker={this.mouseClicker}
              startX={this.state.startX}
              startY={this.state.startY}
              midX={this.state.midX}
              midY={this.state.midY}
              endX={this.state.endX}
              endY={this.state.endY}
              selectedOption={this.state.selectedOption}
              nadeClass={"userNadeNormal"}
              lines={this.state.lines}
              icon={"list"}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SubmitNade;
