import React, { Component } from "react";

class TextInput extends Component {
  render() {
    return (
      <input
        className="form-control"
        type="text"
        name={this.props.name}
        value={this.props.inputText}
        onChange={this.props.onChange}
        required
      />
    );
  }
}

export default TextInput;
