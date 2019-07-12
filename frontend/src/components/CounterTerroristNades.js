import React, { Component } from "react";
import Smokes from "./Smokes";
import Molotovs from "./Molotovs";
import Flashes from "./Flashes";

class CounterTerroristNades extends Component {
  render() {
    if (this.props.tOrCt === "CT") {
      return (
        <React.Fragment>
          <Smokes
            match={this.props.match}
            nadeData={this.props.nadeData.filter(nade => nade.type === "Smoke")}
            smokesFlag={this.props.smokesFlag}
            flashesFlag={this.props.flashesFlag}
            molotovsFlag={this.props.molotovsFlag}
          />
          <Molotovs
            match={this.props.match}
            nadeData={this.props.nadeData.filter(
              nade => nade.type === "Molotov"
            )}
            smokesFlag={this.props.smokesFlag}
            flashesFlag={this.props.flashesFlag}
            molotovsFlag={this.props.molotovsFlag}
          />
          <Flashes
            match={this.props.match}
            nadeData={this.props.nadeData.filter(nade => nade.type === "Flash")}
            smokesFlag={this.props.smokesFlag}
            flashesFlag={this.props.flashesFlag}
            molotovsFlag={this.props.molotovsFlag}
          />
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default CounterTerroristNades;
