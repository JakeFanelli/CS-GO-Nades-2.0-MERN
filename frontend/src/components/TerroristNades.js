import React, { Component } from "react";
import Smokes from "./Smokes";

class TerroristNades extends Component {
  state = {
    T_nade_data: (this.props.nadeData.filter = nade => {
      if (nade.side === "T") {
        return nade;
      }
    })
  };

  render() {
    if (this.props.tOrCt === "T") {
      return (
        <Smokes match={this.props.match} nadeData={this.state.T_nade_data} />
      );
    } else {
      return null;
    }
  }
}

export default TerroristNades;
