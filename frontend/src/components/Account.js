import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Account extends Component {
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <h3>My Account</h3>
      </div>
    );
  }
}

export default Account;
