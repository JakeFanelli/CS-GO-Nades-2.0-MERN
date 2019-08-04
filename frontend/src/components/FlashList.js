import React, { Component } from "react";
import ListItem from "./ListItem";

class FlashList extends Component {
  render() {
    if (this.props.flashesFlag) {
      const items = [];
      this.props.nadeData.forEach(nade => {
        items.push(
          <ListItem key={nade._id} nade={nade} match={this.props.match} />
        );
      });
      return items;
    } else {
      return null;
    }
  }
}

export default FlashList;
