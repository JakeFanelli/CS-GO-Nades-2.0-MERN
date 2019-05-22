import React, { Component } from "react";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

class LoggedInOrOut extends Component {
  constructor(props) {
    super(props);
  }

  //if user is logged in we'll show them Logout and My Account, and if
  //not we'll show them Login and Register, otherwise be blank
  //blank is for when browser is refreshed when user is logged in
  render() {
    if (this.props.loggedIn === true) {
      return <LoggedInNav loggedInUpdate={this.props.loggedInUpdate} />;
    } else if (this.props.loggedIn === false) {
      return <LoggedOutNav loggedInUpdate={this.props.loggedInUpdate} />;
    } else {
      return null;
    }
  }
}
export default LoggedInOrOut;
