import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { URL } from "../helpers";
import { NotificationManager } from "react-notifications";
import axios from "axios";

class LoggedInOrOut extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    axios(`${URL}/logout`, {
      method: "post",
      withCredentials: true
    }).then(res => {
      //success
      NotificationManager.success("Successully logged out!", "Success!", 4000);
      this.props.loggedInUpdate();
    });
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Nav>
          <Link to="/" className="nav-link logout" onClick={this.handleClick}>
            Logout
          </Link>
          <Link to="/account" className="nav-link">
            My Account
          </Link>
        </Nav>
      );
    } else {
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
    }
  }
}
export default LoggedInOrOut;
