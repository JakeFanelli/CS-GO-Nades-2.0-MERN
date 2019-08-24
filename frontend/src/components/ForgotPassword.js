import React, { Component } from "react";
import { URL } from "../helpers";
import axios from "axios";
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
    axios(`${URL}/forgotPassword`, {
      method: "post",
      withCredentials: true,
      data: { email: this.state.email }
    }).then(res => {
      this.setState({ email: "" });
      NotificationManager.success(
        "An email has been sent, might be in spam folder",
        "Success!",
        4000
      );
    });
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
