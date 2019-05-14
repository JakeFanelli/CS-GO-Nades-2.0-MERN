import React, { Component } from "react";
import axios from "axios";
import { PasswordReqs, ConfirmPasswordReqs } from "./PasswordReqs";
import { NotificationManager } from "react-notifications";
import { Redirect } from "react-router-dom";
import {
  regexHasLower,
  regexHasUpper,
  regexHasNum,
  regexHasLength,
  URL
} from "../helpers";

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      redirectToHome: false,
      hasLowerChars: false,
      hasUpperChars: false,
      hasNumChars: false,
      hasLength: false
    };
  }

  //When user clicks Register button on Register Page
  onSubmit = e => {
    e.preventDefault();
    //User object based on the fields on the form
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };
    //API endpoint call to register our user in our mongoDB
    axios(`${URL}/register`, {
      method: "post",
      withCredentials: true,
      data: user
    })
      .then(res => {
        //success
        const userObj = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm,
          _id: res.data._id
        };
        axios(`${URL}/login`, {
          method: "post",
          withCredentials: true,
          data: userObj
        }).then(res => {
          //success and setting loggedIn state to true with loggedInUpdate()
          NotificationManager.success(
            "Successully logged in!",
            "Success!",
            4000
          );
        });
        NotificationManager.success(
          "Account successfully created",
          "Success!",
          4000
        );
        //set loggedIn to true and reset the form & make sure user is redirected to Home Page
        this.props.loggedInUpdate();
        this.setState({
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
          redirectToHome: true
        });
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data.errors) {
            error.response.data.errors.map(err => {
              NotificationManager.error(err.msg, "Error", 4000);
            });
          } else if (error.response.data.err) {
            if (
              error.response.data.err.message ===
              "A user with the given username is already registered"
            ) {
              NotificationManager.error(
                "A user with that email is already registered",
                "Error",
                4000
              );
            }
          } else {
            NotificationManager.error(error.toString(), "Error", 4000);
          }
        } else {
          NotificationManager.error(error.toString(), "Error", 4000);
        }
      });
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    if (e.currentTarget.name === "password") {
      this.testCases(e.currentTarget.value);
    }
  };

  //checking if the form fields meet requirements
  testCases = value => {
    regexHasLower.test(value)
      ? this.setState({ hasLowerChars: true })
      : this.setState({ hasLowerChars: false });

    regexHasUpper.test(value)
      ? this.setState({ hasUpperChars: true })
      : this.setState({ hasUpperChars: false });

    regexHasNum.test(value)
      ? this.setState({ hasNumChars: true })
      : this.setState({ hasNumChars: false });

    regexHasLength.test(value)
      ? this.setState({ hasLength: true })
      : this.setState({ hasLength: false });
  };

  render() {
    if (this.state.redirectToHome || this.props.loggedIn === true) {
      return <Redirect to="/" />;
    } else if (this.props.loggedIn === false) {
      return (
        <div className="container">
          <h3>Register</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                required
              />
            </div>
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
            <PasswordReqs
              password={this.state.password}
              hasLowerChars={this.state.hasLowerChars}
              hasUpperChars={this.state.hasUpperChars}
              hasNumChars={this.state.hasNumChars}
              hasLength={this.state.hasLength}
            />
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                className="form-control"
                placeholder="Password"
                value={this.state.passwordConfirm}
                onChange={this.handleChange}
                required
              />
            </div>
            <ConfirmPasswordReqs
              password={this.state.password}
              passwordConfirm={this.state.passwordConfirm}
            />
            <div className="form-group">
              <input
                type="submit"
                className="btn btn-primary"
                value="Register"
              />
            </div>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Register;
