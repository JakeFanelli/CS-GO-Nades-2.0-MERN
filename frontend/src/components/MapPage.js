import React, { Component } from "react";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapImage: ""
    };
  }

  componentWillMount() {}

  render() {
    return (
      <div className="container">
        <h2>
          {this.props.match.params.id.charAt(0).toUpperCase() +
            this.props.match.params.id.slice(1)}
        </h2>
      </div>
    );
  }
}

export default MapPage;
