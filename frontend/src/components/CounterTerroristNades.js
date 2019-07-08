import React, { Component } from "react";
import Smokes from "./Smokes";
import Molotovs from "./Molotovs";
import Flashes from "./Flashes";

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
        <React.Fragment>
          <Smokes
            match={this.props.match}
            nadeData={this.state.CT_nade_data}
            smokesFlag={this.props.smokesFlag}
            flashesFlag={this.props.flashesFlag}
            molotovsFlag={this.props.molotovsFlag}
          />
          <Molotovs
            match={this.props.match}
            nadeData={this.state.CT_nade_data}
            smokesFlag={this.props.smokesFlag}
            flashesFlag={this.props.flashesFlag}
            molotovsFlag={this.props.molotovsFlag}
          />
          <Flashes
            match={this.props.match}
            nadeData={this.state.CT_nade_data}
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
