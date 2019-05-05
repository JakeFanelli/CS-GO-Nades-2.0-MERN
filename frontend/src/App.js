import React, { Component } from "react";
import MenuBar from "./components/MenuBar";
import { NotificationContainer } from "react-notifications";
import { URL } from "./helpers";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    document.title = "CS:GO Nades";
    axios(`${URL}/user`, {
      method: "get",
      withCredentials: true
    }).then(res => {
      this.setState({ loggedIn: true });
    });
  }

  state = {
    loggedIn: false
  };

  loggedInUpdate = () => {
    let loggedIn = this.state.loggedIn;
    loggedIn = !loggedIn;
    this.setState({ loggedIn });
  };

  render() {
    return (
      <div>
        <MenuBar
          loggedIn={this.state.loggedIn}
          loggedInUpdate={this.loggedInUpdate}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
