import React, { Component } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { URL } from "../helpers";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectToHomeState = this.redirectToHomeState.bind(this);

    this.state = {
      email: "",
      password: "",
      redirectToHome: false
    };
  }
  //when user logs in we set this to true and this sets the flag to
  //redirect them to home page
  redirectToHomeState = () => {
    let redirectToHome = this.state.redirectToHome;
    redirectToHome = true;
    this.setState({ redirectToHome });
  };
  //When user clicks Log In button
  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    //API endpoint call to log in our user
    axios(`${URL}/login`, {
      method: "post",
      withCredentials: true,
      data: user
    })
      .then(res => {
        //success and setting loggedIn state to true with loggedInUpdate()
        NotificationManager.success("Successully logged in!", "Success!", 4000);
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
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    if (this.state.redirectToHome || this.props.loggedIn) {
      return <Redirect to="/" />;
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Log In" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
