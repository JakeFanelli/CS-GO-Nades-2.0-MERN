import React, { Component } from "react";
import axios from "axios";
import { URL } from "../helpers";
import NoMatch from "./NoMatch";
import LikesDislikes from "./LikesDislikes";

class NadePage extends Component {
  state = {
    nadeTitle: "",
    authorID: "",
    author: "",
    videoURL: "",
    dateSubmitted: "",
    showNoMatchComponent: false,
    likes: "",
    dislikes: "",
    likesArr: "",
    dislikesArr: "",
    like: "thumbs-up",
    dislike: "thumbs-down",
    loggedIn: "",
    user: {}
  };

  componentWillMount() {
    //api call to validate user being logged in for fresh load to this URL
    axios(`${URL}/validateSession`, {
      method: "get",
      withCredentials: true
    })
      .then(res => {
        if (res.data.msg === "yes") {
          this.setState({ loggedIn: true });
        } else if (res.data.msg === "no") {
          this.setState({ loggedIn: false });
        }
      })
      .then(res => {
        axios(`${URL}/user`, {
          method: "get",
          withCredentials: true
        })
          .then(res => {
            if (res.data.email) {
              this.setState({ user: res.data });
            }
          })
          .then(res => {
            if (this.state.loggedIn) {
              if (this.state.likesArr.includes(this.props.user._id)) {
                this.setState({ like: "thumps-up liked" });
              }
              if (this.state.dislikesArr.includes(this.props.user._id)) {
                this.setState({ dislike: "thumps-up disliked" });
              }
            }
          });
      });
    //api endpoint to load nade video
    axios(`${URL}/loadNadeVideo`, {
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
          let numLikes = res.data.likesArr.length;
          let numDislikes = res.data.dislikesArr.length;
          this.setState({
            nadeTitle: res.data.title,
            authorID: res.data.authorID,
            videoURL: res.data.url,
            dateSubmitted: fullDate,
            likes: numLikes,
            dislikes: numDislikes,
            likesArr: res.data.likesArr,
            dislikesArr: res.data.dislikesArr
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

  like = () => {
    if (this.state.loggedIn) {
      axios(`${URL}/likeNadePost`, {
        method: "post",
        withCredentials: true,
        data: {
          userID: this.state.user._id,
          nadeID: this.props.match.params.id
        }
      })
        .then(res => {
          this.setState({
            likes: this.state.likes + 1,
            like: "thumps-up liked"
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("you must be logged in!");
    }
  };

  dislike = () => {
    this.setState({
      dislikes: this.state.dislikes + 1
    });
  };

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
          <div className="d-flex w-100 justify-content-between">
            <div>
              <label className="label">Author</label>
              <p>{this.state.author}</p>
            </div>
            <LikesDislikes
              likes={this.state.likes}
              dislikes={this.state.dislikes}
              like={this.like}
              dislike={this.dislike}
              userLikes={this.state.like}
              userDislikes={this.state.dislike}
            />
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
