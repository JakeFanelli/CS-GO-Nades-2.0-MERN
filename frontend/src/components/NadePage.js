import React, { Component } from "react";
import axios from "axios";
import { URL } from "../helpers";
import NoMatch from "./NoMatch";

class NadePage extends Component {
  state = {
    nadeTitle: "",
    authorID: "",
    author: "",
    videoURL: "",
    dateSubmitted: "",
    showNoMatchComponent: false
  };

  componentWillMount() {
    if (!this.props.userSubmissionFlag) {
      var apiCall = "loadNadeVideo";
    } else {
      apiCall = "loadUnverifiedNadeVideo";
    }
    //api endpoint to load nade video
    axios(`${URL}/${apiCall}`, {
      method: "post",
      withCredentials: true,
      data: {
        nadeID: this.props.match.params.id
      }
    })
      .then(res => {
        if (res.data) {
          let dateReturned = new Date(res.data.date);
          let month = dateReturned.getMonth() + 1;
          let day = dateReturned.getDate();
          let year = dateReturned.getFullYear();
          let fullDate = month + "/" + day + "/" + year;
          this.setState({
            nadeTitle: res.data.title,
            authorID: res.data.authorID,
            videoURL: res.data.url,
            dateSubmitted: fullDate
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
      })
      .catch(error => {
        if (error.response) {
          if (error.response.data) {
            if (error.response.data.name === "CastError") {
              this.setState({
                showNoMatchComponent: true
              });
            }
          }
        }
      });
  }

  render() {
    if (this.state.showNoMatchComponent) {
      return <NoMatch />;
    } else {
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
}

export default NadePage;
