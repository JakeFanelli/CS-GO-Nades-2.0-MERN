import React, { Component } from "react";
import Smokes from "./Smokes";

class CounterTerroristNades extends Component {
  state = {
    CT_nade_data: (this.props.nadeData.filter = nade => {
      if (nade.side === "CT") {
        return nade;
      }
    })
  };

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
