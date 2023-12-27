import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AccountRow extends Component {
  render() {
    if (this.props.loggedIn) {
      return null;
    } else {
      return (
        <div className="row row2">
          <div className="rowImage col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <FontAwesomeIcon
              icon="user-circle"
              className="spotlightIcon"
              size="lg"
            />
          </div>
          <div className="rowContent col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <h3>Create Account</h3>
            <p>To vote or upload you first need to create an account!</p>
            <Link className="btn btn-primary" to="/register">
              Learn more
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default AccountRow;
