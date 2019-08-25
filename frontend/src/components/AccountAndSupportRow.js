import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AccountAndSupportRow extends Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <div className="row row2 lastItem">
          <div className="rowImage col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <FontAwesomeIcon
              icon="donate"
              className="spotlightIcon"
              size="lg"
            />
          </div>
          <div className="rowContent col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <h3>Support</h3>
            <p>Feel free to donate! Helps go towards improvements.</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              href="https://www.paypal.me/JacobFanelli"
            >
              Learn more
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row row4">
          <div className="rowContentWithImage col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div className="createAndSupport">
              <FontAwesomeIcon
                icon="user-circle"
                className="spotlightIcon"
                size="lg"
              />
            </div>
            <h3>Create Account</h3>
            <p>To vote or upload you need to create an account!</p>
            <Link className="btn btn-primary" to="/register">
              Learn more
            </Link>
          </div>
          <div className="rowContentWithImage lastItem col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div className="createAndSupport">
              <FontAwesomeIcon
                icon="donate"
                className="spotlightIcon"
                size="lg"
              />
            </div>
            <h3>Support</h3>
            <p>Feel free to donate! Helps go towards improvements.</p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              href="https://www.paypal.me/JacobFanelli"
            >
              Learn more
            </a>
          </div>
        </div>
      );
    }
  }
}

export default AccountAndSupportRow;
