import React, { Component } from "react";
import { Link } from "react-router-dom";

class FlashList extends Component {
  createMapItems = () => {
    let nades = [];
    this.props.nadeData.forEach(nade => {
      nades.push(
        <div className="nadeItem" key={nade._id}>
          <Link to={this.props.match.params.id + "/" + nade._id}>
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{nade.title}</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">{nade.authorID}</p>
          </Link>
        </div>
      );
    });
    return nades;
  };

  render() {
    if (this.props.flashesFlag) {
      return this.createMapItems();
    } else {
      return null;
    }
  }
}

export default FlashList;
