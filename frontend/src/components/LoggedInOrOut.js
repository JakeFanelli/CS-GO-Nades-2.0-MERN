import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { URL } from "../helpers";
import { NotificationManager } from "react-notifications";
import axios from "axios";

class LoggedInOrOut extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  //API endpoint call to logout our user
  handleLogoutClick() {
    axios(`${URL}/logout`, {
      method: "post",
      withCredentials: true
    }).then(res => {
      //success
      NotificationManager.success("Successully logged out!", "Success!", 4000);
      this.props.loggedInUpdate();
    });
  }

  //if user is logged in we'll show them Logout and My Account, and if
  //not we'll show them Login and Register, otherwise be blank
  //blank is for when browser is refreshed when user is logged in
  render() {
    if (this.props.loggedIn === true) {
      return (
        <Nav>
          <Link
            to="/"
            className="nav-link logout"
            onClick={this.handleLogoutClick}
          >
            Logout
          </Link>
          <Link to="/account" className="nav-link">
            My Account
          </Link>
        </Nav>
      );
    } else if (this.props.loggedIn === false) {
      return (
        <Nav>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </Nav>
      );
    } else {
      return null;
    }
  }
}
export default LoggedInOrOut;
