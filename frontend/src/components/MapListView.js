import React, { Component } from "react";
import BothNadesList from "./BothNadesList";

class MapListView extends Component {
  render() {
    if (this.props.icon === "map") {
      return (
        <div className="listContainer">
          <div className="list-group">
            <BothNadesList
              match={this.props.match}
              tOrCt={this.props.tOrCt}
              nadeData={this.props.nadeData}
              smokesFlag={this.props.smokesFlag}
              flashesFlag={this.props.flashesFlag}
              molotovsFlag={this.props.molotovsFlag}
            />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default MapListView;
