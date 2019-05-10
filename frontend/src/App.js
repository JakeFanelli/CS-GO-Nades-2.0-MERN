import React, { Component } from "react";
import MenuBar from "./components/MenuBar";
import { NotificationContainer } from "react-notifications";
import { URL } from "./helpers";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: "",
      user: {}
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

  loggedInUpdate = () => {
    let loggedIn = this.state.loggedIn;
    loggedIn = !loggedIn;
    this.setState({ loggedIn });
  };

  setName = nameParam => {
    let name = this.state.name;
    name = nameParam;
    this.setState({ name });
  };

  setEmail = emailParam => {
    let email = this.state.email;
    email = emailParam;
    this.setState({ email });
  };

  render() {
    return (
      <div>
        <MenuBar
          loggedIn={this.state.loggedIn}
          loggedInUpdate={this.loggedInUpdate}
          user={this.state.user}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
