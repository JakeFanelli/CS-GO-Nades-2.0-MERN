import React, { Component } from "react";
import Smokes from "./Smokes";

class CounterTerroristNades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CT_nade_data: []
    };
  }
  componentWillMount() {
    this.setState({
      CT_nade_data: this.props.nadeData.filter(nade => nade.side === "CT")
    });
  }
  render() {
    if (this.props.tOrCt === "CT") {
      return (
        <Smokes match={this.props.match} nadeData={this.state.CT_nade_data} />
      );
    } else {
      return null;
    }
  }
}

export default CounterTerroristNades;
