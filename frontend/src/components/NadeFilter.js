import React, { Component } from "react";

class NadeFilter extends Component {
  render() {
    return (
      <div
        className="btn-group btn-group-toggle filterBar"
        data-toggle="buttons"
      >
        <input
          id="smokebox"
          type="checkbox"
          name="smokebox"
          onChange={this.props.smokesFlagUpdate}
          checked={this.props.smokesFlag}
        />
        <label htmlFor="smokebox" className="btn filterLabel">
          Smokes
        </label>
        <input
          id="flashbox"
          type="checkbox"
          name="flashbox"
          onChange={this.props.flashesFlagUpdate}
          checked={this.props.flashesFlag}
        />
        <label htmlFor="flashbox" className="btn filterLabel">
          Flashes
        </label>
        <input
          id="molotovbox"
          type="checkbox"
          name="molotovbox"
          onChange={this.props.molotovsFlagUpdate}
          checked={this.props.molotovsFlag}
        />
        <label htmlFor="molotovbox" className="btn filterLabel">
          Molotovs
        </label>
      </div>
    );
  }
}

export default NadeFilter;
