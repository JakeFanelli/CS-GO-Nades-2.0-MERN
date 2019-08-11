import React, { Component } from "react";
import MenuBar from "./components/MenuBar";
import axios from "axios";
import { NotificationContainer } from "react-notifications";
import { URL } from "./helpers";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faMap, faList } from "@fortawesome/free-solid-svg-icons";
import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

library.add(faEdit);
library.add(faMap);
library.add(faList);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: "",
      user: {},
      tOrCt: "T",
      smokesFlag: true,
      flashesFlag: false,
      molotovsFlag: false,
      icon: "list",
      nadeData: [],
      userSubmissionFlag: false
    };
    document.title = "CS:GO Nades";
    axios(`${URL}/validateSession`, {
      method: "get",
      withCredentials: true
    })
      .then(res => {
        if (res.data.msg === "yes") {
          this.setState({ loggedIn: true });
        } else if (res.data.msg === "no") {
          this.setState({ loggedIn: false });
        }
      })
      .then(res => {
        axios(`${URL}/user`, {
          method: "get",
          withCredentials: true
        }).then(res => {
          if (res.data.email) {
            this.setState({ user: res.data });
          }
        });
      });
  }

  updateUser = user => {
    this.setState({ user });
  };

  updateUsername = username => {
    let user = { ...this.state.user };
    user.username = username;
    this.setState({ user });
  };

  updateEmail = email => {
    let user = { ...this.state.user };
    user.email = email;
    this.setState({ user });
  };

  loggedInUpdate = () => {
    let loggedIn = this.state.loggedIn;
    loggedIn = !loggedIn;
    this.setState({ loggedIn });
  };

  switchSides = () => {
    this.state.tOrCt === "T"
      ? this.setState({ tOrCt: "CT" })
      : this.setState({ tOrCt: "T" });
  };

  smokesFlagUpdate = () => {
    this.state.smokesFlag === false
      ? this.setState({ smokesFlag: true })
      : this.setState({ smokesFlag: false });
  };

  flashesFlagUpdate = () => {
    this.state.flashesFlag === false
      ? this.setState({ flashesFlag: true })
      : this.setState({ flashesFlag: false });
  };

  molotovsFlagUpdate = () => {
    this.state.molotovsFlag === false
      ? this.setState({ molotovsFlag: true })
      : this.setState({ molotovsFlag: false });
  };

  toggleView = () => {
    this.state.icon === "list"
      ? this.setState({ icon: "map" })
      : this.setState({ icon: "list" });
  };

  updateNadeData = nadeData => {
    this.setState({
      nadeData: nadeData
    });
  };

  userSubmissionFlagUpdate = () => {
    this.setState({
      userSubmissionFlag: !this.state.userSubmissionFlag
    });
  };

  render() {
    return (
      <div>
        <MenuBar
          loggedIn={this.state.loggedIn}
          loggedInUpdate={this.loggedInUpdate}
          user={this.state.user}
          updateUser={this.updateUser}
          updateUsername={this.updateUsername}
          updateEmail={this.updateEmail}
          tOrCt={this.state.tOrCt}
          switchSides={this.switchSides}
          smokesFlag={this.state.smokesFlag}
          flashesFlag={this.state.flashesFlag}
          molotovsFlag={this.state.molotovsFlag}
          smokesFlagUpdate={this.smokesFlagUpdate}
          flashesFlagUpdate={this.flashesFlagUpdate}
          molotovsFlagUpdate={this.molotovsFlagUpdate}
          icon={this.state.icon}
          toggleView={this.toggleView}
          nadeData={this.state.nadeData}
          updateNadeData={this.updateNadeData}
          userSubmissionFlag={this.state.userSubmissionFlag}
          userSubmissionFlagUpdate={this.userSubmissionFlagUpdate}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
