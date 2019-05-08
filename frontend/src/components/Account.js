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
        <p>hello {this.props.user.name}</p>
        <p>email: {this.props.user.email}</p>
      </div>
    );
  }
}

export default Account;
