import React, { Component } from "react";
import AccountEditingOrViewing from "./AccountEditingOrViewing";
import { Redirect } from "react-router-dom";

class Account extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);

    this.state = {
      editing: false
    };
  }

  handleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  render() {
    if (this.props.loggedIn === false) {
      return <Redirect to="/login" />;
    } else if (this.props.loggedIn === true) {
      return (
        <div className="container">
          <h3>My Account</h3>
          <AccountEditingOrViewing
            editing={this.state.editing}
            user={this.props.user}
            handleEdit={this.handleEdit}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Account;
