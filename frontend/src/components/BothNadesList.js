import React, { Component } from "react";
import CTList from "./CTList";
import TList from "./TList";

class BothNadesList extends Component {
  render() {
    if (this.props.tOrCt === "CT") {
      return (
        <CTList
          match={this.props.match}
          nadeData={this.props.nadeData.filter(nade => nade.side === "CT")}
          smokesFlag={this.props.smokesFlag}
          flashesFlag={this.props.flashesFlag}
          molotovsFlag={this.props.molotovsFlag}
        />
      );
    } else {
      return (
        <TList
          match={this.props.match}
          nadeData={this.props.nadeData.filter(nade => nade.side === "T")}
          smokesFlag={this.props.smokesFlag}
          flashesFlag={this.props.flashesFlag}
          molotovsFlag={this.props.molotovsFlag}
        />
      );
    }
  }
}

export default BothNadesList;
