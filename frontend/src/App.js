import React, { Component } from "react";
import MenuBar from "./components/MenuBar";
import { NotificationContainer } from "react-notifications";

import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

class App extends Component {
  componentDidMount() {
    document.title = "CS:GO Nades";
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
