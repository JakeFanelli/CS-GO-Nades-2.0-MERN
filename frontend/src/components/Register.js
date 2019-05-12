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

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
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
  onSubmit(e) {
    e.preventDefault();
    //User object based on the fields on the form
    const user = {
      name: this.state.name,
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
        NotificationManager.success(
          "Account successfully created",
          "Success!",
          4000
        );
        //set loggedIn to true and reset the form & make sure user is redirected to Home Page
        this.props.loggedInUpdate();
        this.setState({
          name: "",
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
          } else if (
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
      });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
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
    this.testCases(e.target.value);
  }
  onChangePasswordConfirm(e) {
    this.setState({
      passwordConfirm: e.target.value
    });
  }
  //checking if the form fields meet requirements
  testCases(value) {
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
  }

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
                name="name"
                className="form-control"
                placeholder="Username"
                value={this.state.name}
                onChange={this.onChangeName}
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
                onChange={this.onChangePasswordConfirm}
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
                onSubmit={this.onSubmit}
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
