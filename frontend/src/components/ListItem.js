import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListItem extends Component {
  state = {
    fullDate: ""
  };

  componentWillMount() {
    let dateReturned = new Date(this.props.nade.date);
    let month = dateReturned.getMonth() + 1;
    let day = dateReturned.getDate();
    let year = dateReturned.getFullYear();
    let fullDate = month + "/" + day + "/" + year;
    this.setState({
      fullDate: fullDate
    });
  }

  render() {
    return (
      <div className="nadeItem col" key={this.props.nade._id}>
        <Link to={this.props.match.params.id + "/" + this.props.nade._id}>
          <div className="topLine d-flex w-100 justify-content-between">
            <h5 className="mb-1">{this.props.nade.title}</h5>
            <small className="nadeTime">{this.state.fullDate}</small>
          </div>
          <p className="authorNade mb-1">{this.props.nade.author}</p>
        </Link>
      </div>
    );
  }
}

export default ListItem;
