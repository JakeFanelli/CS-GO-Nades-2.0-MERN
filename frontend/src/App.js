import React, { Component } from "react";
import MenuBar from "./components/MenuBar";
import { NotificationContainer } from "react-notifications";

import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <MenuBar />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
