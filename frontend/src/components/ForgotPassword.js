import React, { Component } from "react";
import { NotificationManager } from "react-notifications";

class ForgotPassword extends Component {
  state = {
    email: ""
  };
  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  onSubmit = e => {
    e.preventDefault();
    NotificationManager.success(
      "If an account with that address exists an email will be sent.",
      "Success!",
      4000
    );
  };
  render() {
    return (
      <div className="container">
        <h3>Forgot Password</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Continue" />
          </div>
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
