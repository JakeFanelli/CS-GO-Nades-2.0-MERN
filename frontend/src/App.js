import React, { Component } from "react";
import MenuBar from "./components/MenuBar";
import axios from "axios";
import { NotificationContainer } from "react-notifications";
import { URL } from "./helpers";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

library.add(faEdit);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: "",
      user: {},
      tOrCt: "T"
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
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
