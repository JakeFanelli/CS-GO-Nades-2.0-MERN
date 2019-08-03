import React, { Component } from "react";
import SmokeList from "./SmokeList";
import FlashList from "./FlashList";
import MolotovList from "./MolotovList";

class CTList extends Component {
  render() {
    return (
      <React.Fragment>
        <SmokeList
          nadeData={this.props.nadeData.filter(nade => nade.type === "Smoke")}
          smokesFlag={this.props.smokesFlag}
          match={this.props.match}
        />
        <FlashList
          nadeData={this.props.nadeData.filter(nade => nade.type === "Flash")}
          flashesFlag={this.props.flashesFlag}
          match={this.props.match}
        />
        <MolotovList
          nadeData={this.props.nadeData.filter(nade => nade.type === "Molotov")}
          molotovsFlag={this.props.molotovsFlag}
          match={this.props.match}
        />
      </React.Fragment>
    );
  }
}

export default CTList;
