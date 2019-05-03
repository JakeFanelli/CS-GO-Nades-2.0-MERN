import React, { Component } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { URL } from "../helpers";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToHomeState = this.redirectToHomeState.bind(this);

    this.state = {
      email: "",
      password: "",
      redirectToHome: false
    };
  }

  redirectToHomeState() {
    let redirectToHome = this.state.redirectToHome;
    redirectToHome = true;
    this.setState({ redirectToHome });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(`${URL}/login`, user)
      .then(res => {
        //success
        NotificationManager.success("Successully logged in!", "Success!", 4000);
        this.redirectToHomeState();
        this.props.loggedInUpdate();
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.errors) {
            error.response.data.errors.map(err => {
              NotificationManager.error(err.msg, "Error", 4000);
            });
          } else if (error.response.status === 401) {
            NotificationManager.error(
              "Sorry, we couldn't find an account with that email and password.",
              "Error",
              4000
            );
          }
        } else {
          NotificationManager.error(error.toString(), "Error", 4000);
        }
      });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    if (this.props.loggedIn) {
      return <Redirect to="/account" />;
    }
    return (
      <div className="container">
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Log In"
              onSubmit={this.onSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
