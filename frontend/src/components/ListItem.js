import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../helpers";

class ListItem extends Component {
  state = {
    author: "",
    fullDate: ""
  };
  constructor(props) {
    super(props);
    axios(`${URL}/getAuthorUserName`, {
      method: "post",
      withCredentials: true,
      data: {
        authorID: this.props.nade.authorID
      }
    }).then(res => {
      this.setState({
        author: res.data.username
      });
    });
  }

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
          <div className="nameTimeNade d-flex w-100 justify-content-between">
            <h5 className="mb-1">{this.props.nade.title}</h5>
            <small>{this.state.fullDate}</small>
          </div>
          <p className="authorNade mb-1">{this.state.author}</p>
        </Link>
      </div>
    );
  }
}

export default ListItem;
