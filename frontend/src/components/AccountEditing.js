import React, { Component } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";

import { URL } from "../helpers";

class AccountEditing extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      email: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (e.currentTarget.value === "Cancel") {
      this.props.handleEdit();
    } else {
      const user = {
        id: this.props.user._id,
        username: this.state.username,
        email: this.state.email
      };
      if (user.username === "") {
        user.username = this.props.user.username;
      }
      if (user.email === "") {
        user.email = this.props.user.email;
      }
      axios(`${URL}/updateUser`, {
        method: "post",
        withCredentials: true,
        data: user
      })
        .then(res => {
          this.props.handleEdit();
          this.props.updateUsername(user.username);
          this.props.updateEmail(user.email);
          NotificationManager.success(
            "Successully updated account!",
            "Success!",
            4000
          );
        })
        .catch(error => {
          if (error.response) {
            if (error.response.data.errors) {
              error.response.data.errors.map(err => {
                return NotificationManager.error(err.msg, "Error", 4000);
              });
            }
          } else {
            NotificationManager.error(error.toString(), "Error", 4000);
          }
        });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder={this.props.user.username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder={this.props.user.email}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-primary save-button"
            value="Save"
          />
          <input
            type="button"
            className="btn btn-info"
            value="Cancel"
            onClick={this.onSubmit}
          />
        </div>
      </form>
    );
  }
}

export default AccountEditing;
