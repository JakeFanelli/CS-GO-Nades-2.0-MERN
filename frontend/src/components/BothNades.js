import React, { Component } from "react";
import TerroristNades from "./TerroristNades";
import CounterTerroristNades from "./CounterTerroristNades";

class BothNades extends Component {
  render() {
    if (this.props.show) {
      return (
        <React.Fragment>
          <TerroristNades
            match={this.props.match}
            tOrCt={this.props.tOrCt}
            nadeData={this.props.nadeData.filter(nade => nade.side === "T")}
            smokesFlag={this.props.smokesFlag}
            flashesFlag={this.props.flashesFlag}
            molotovsFlag={this.props.molotovsFlag}
          />
          <CounterTerroristNades
            match={this.props.match}
            tOrCt={this.props.tOrCt}
            nadeData={this.props.nadeData.filter(nade => nade.side === "CT")}
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

export default BothNades;
