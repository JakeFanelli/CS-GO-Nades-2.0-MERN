import React, { Component } from "react";
import { PasswordReqs, ConfirmPasswordReqs } from "./PasswordReqs";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  regexHasLower,
  regexHasUpper,
  regexHasNum,
  regexHasLength,
  URL
} from "../helpers";
import { NotificationManager } from "react-notifications";

class ResetPassword extends Component {
  state = {
    valid: "",
    password: "",
    passwordConfirm: "",
    hasLowerChars: false,
    hasUpperChars: false,
    hasNumChars: false,
    hasLength: false,
    redirectToHome: false
  };
  componentWillMount() {
    axios(`${URL}/confirmResetPassword`, {
      method: "post",
      withCredentials: true,
      data: { token: this.props.match.params.id }
    }).then(res => {
      if (res.data.info === "Pass") {
        this.setState({ valid: true });
      } else {
        this.setState({ valid: false });
        NotificationManager.error(
          "Password reset is invalid or has expired",
          "Error!",
          4000
        );
      }
    });
  }

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

  onSubmit = e => {
    e.preventDefault();
    axios(`${URL}/updatePassword`, {
      method: "post",
      withCredentials: true,
      data: {
        token: this.props.match.params.id,
        password: this.state.passwordConfirm,
        passwordConfirm: this.state.passwordConfirm
      }
    }).then(res => {
      if (res.data.info === "Pass") {
        NotificationManager.success("Password updated", "Success!", 4000);
        this.setState({ redirectToHome: true });
      } else {
        this.setState({ valid: false });
        NotificationManager.error(
          "Password reset is invalid or has expired",
          "Error!",
          4000
        );
      }
    });
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    if (this.state.valid === true) {
      return (
        <div className="container">
          <form onSubmit={this.onSubmit}>
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
                value="Continue"
              />
            </div>
          </form>
        </div>
      );
    } else if (this.state.valid === false) {
      return <Redirect to="/forgot_password" />;
    } else {
      return <p />;
    }
  }
}

export default ResetPassword;
