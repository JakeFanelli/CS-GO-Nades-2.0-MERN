import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { URL } from "../helpers";
import { NotificationManager } from "react-notifications";
import axios from "axios";

class LoggedInNav extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }
  //API endpoint call to logout our user
  handleLogoutClick = () => {
    axios(`${URL}/logout`, {
      method: "post",
      withCredentials: true
    }).then(res => {
      //success
      NotificationManager.success("Successully logged out!", "Success!", 4000);
      this.props.loggedInUpdate();
    });
  };

  render() {
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
  }
}

export default LoggedInNav;
