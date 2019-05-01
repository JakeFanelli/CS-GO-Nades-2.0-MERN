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
      redirectToLogin: false,
      hasLowerChars: false,
      hasUpperChars: false,
      hasNumChars: false,
      hasLength: false
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm
    };

    axios
      .post(`${URL}/register`, newUser)
      .then(res => {
        //success
        NotificationManager.success(
          "Account successfully created",
          "Success!",
          4000
        );
        this.setState({
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          redirectToLogin: true
        });
      })
      .catch(error => {
        if (error.response.data.errors) {
          error.response.data.errors.map(err => {
            NotificationManager.error(err.msg, "Error", 4000);
          });
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
    if (this.state.redirectToLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <h3>Register</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
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
  }
}

export default Register;
