import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Account extends Component {
  render() {
    if (this.props.loggedIn === false) {
      return <Redirect to="/login" />;
    } else if (this.props.loggedIn === true) {
      return (
        <div className="container">
          <h3>My Account</h3>
          <p>hello {this.props.user.name}</p>
          <p>email: {this.props.user.email}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Account;
