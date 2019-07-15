import React, { Component } from "react";
import axios from "axios";
import { URL } from "../helpers";

class NadePage extends Component {
  state = {
    nadeTitle: "",
    authorID: "",
    author: "",
    videoURL: "",
    dateSubmitted: ""
  };

  componentWillMount() {
    //api endpoint to load nade video
    axios(`${URL}/loadNadeVideo`, {
      method: "post",
      withCredentials: true,
      data: {
        nadeID: this.props.match.params.id
      }
    }).then(res => {
      if (res.data) {
        this.setState({
          nadeTitle: res.data.title,
          authorID: res.data.authorID,
          videoURL: res.data.url,
          dateSubmitted: res.data.date
        });
        axios(`${URL}/getAuthorUserName`, {
          method: "post",
          withCredentials: true,
          data: {
            authorID: this.state.authorID
          }
        }).then(res => {
          this.setState({
            author: res.data.username
          });
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h2>{this.state.nadeTitle}</h2>
        <div className="embed-responsive embed-responsive-16by9">
          <video loop autoPlay muted controls key={this.state.videoURL}>
            <source src={this.state.videoURL} />
          </video>
        </div>
        <div>
          <label className="label">Author</label>
          <p>{this.state.author}</p>
        </div>
        <div>
          <label className="label">Date Submitted</label>
          <p>{this.state.dateSubmitted}</p>
        </div>
      </div>
    );
  }
}

export default NadePage;
