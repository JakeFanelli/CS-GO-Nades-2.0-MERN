import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("SIGNUP FORM SUBMITTED");
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" placeholder="EMAIL" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="PASSWORD"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Register" onSubmit={this.onSubmit} />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
