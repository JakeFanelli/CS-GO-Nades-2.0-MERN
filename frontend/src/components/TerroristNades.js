import React, { Component } from "react";
import Smokes from "./Smokes";
import Molotovs from "./Molotovs";

class TerroristNades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      T_nade_data: []
    };
  }
  componentWillMount() {
    this.setState({
      T_nade_data: this.props.nadeData.filter(nade => nade.side === "T")
    });
  }
  render() {
    if (this.props.tOrCt === "T") {
      return (
        <React.Fragment>
          <Smokes match={this.props.match} nadeData={this.state.T_nade_data} />
          <Molotovs
            match={this.props.match}
            nadeData={this.state.T_nade_data}
          />
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default TerroristNades;
