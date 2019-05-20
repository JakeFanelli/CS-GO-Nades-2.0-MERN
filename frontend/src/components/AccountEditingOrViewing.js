import React, { Component } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URL } from "../helpers";

class AccountEditingOrViewing extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      email: ""
    };
  }

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
                NotificationManager.error(err.msg, "Error", 4000);
              });
            }
          } else {
            NotificationManager.error(error.toString(), "Error", 4000);
          }
        });
    }
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    if (this.props.editing === true) {
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
              type="text"
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
    } else if (this.props.editing === false) {
      return (
        <div>
          <FontAwesomeIcon
            icon={"edit"}
            className="editIcon"
            onClick={this.props.handleEdit}
            size="lg"
          />
          <div>
            <label className="label">Username</label>
            <p>{this.props.user.username}</p>
          </div>
          <div>
            <label className="label">Email</label>
            <p>{this.props.user.email}</p>
          </div>
        </div>
      );
    }
  }
}

export default AccountEditingOrViewing;
