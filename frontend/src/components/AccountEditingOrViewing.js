import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AccountEditingOrViewing extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: "",
      email: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    if (e.currentTarget.value === "Cancel") {
      this.props.handleEdit();
    } else {
      //UPDATE DB
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
              name="name"
              className="form-control"
              placeholder={this.props.user.name}
              onChange={this.handleChange}
              required
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
              required
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
            <p>{this.props.user.name}</p>
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
