import React, { Component } from "react";
import axios from "axios";
import { URL } from "../helpers";
import NoMatch from "./NoMatch";
import LikesDislikes from "./LikesDislikes";
import { NotificationManager } from "react-notifications";

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
          if (res.data.msg === "removed") {
            this.setState({
              likes: this.state.likes - 1,
              like: "thumbs-up"
            });
          }
          if (res.data.msg === "added") {
            this.setState({
              likes: this.state.likes + 1,
              like: "thumbs-up liked"
            });
          }
          if (res.data.msg === "removed and added") {
            this.setState({
              likes: this.state.likes + 1,
              dislikes: this.state.dislikes - 1,
              like: "thumbs-up liked",
              dislike: "thumbs-down"
            });
          }
        })
        .catch(error => {
          NotificationManager.error(error.toString(), "Error", 4000);
        });
    } else {
      NotificationManager.error("You must be logged in!", "Error!", 4000);
    }
  };

  dislike = () => {
    if (this.state.loggedIn) {
      axios(`${URL}/dislikeNadePost`, {
        method: "post",
        withCredentials: true,
        data: {
          userID: this.state.user._id,
          nadeID: this.props.match.params.id
        }
      })
        .then(res => {
          if (res.data.msg === "removed") {
            this.setState({
              dislikes: this.state.dislikes - 1,
              dislike: "thumbs-down"
            });
          }
          if (res.data.msg === "added") {
            this.setState({
              dislikes: this.state.dislikes + 1,
              dislike: "thumbs-down disliked"
            });
          }
          if (res.data.msg === "removed and added") {
            this.setState({
              likes: this.state.likes - 1,
              dislikes: this.state.dislikes + 1,
              like: "thumbs-up",
              dislike: "thumbs-down disliked"
            });
          }
        })
        .catch(error => {
          NotificationManager.error(error.toString(), "Error", 4000);
        });
    } else {
      NotificationManager.error("You must be logged in!", "Error!", 4000);
    }
  };

  render() {
    if (this.state.showNoMatchComponent) {
      return <NoMatch />;
    } else {
      return (
        <div className="container">
          <div
            className="embed-responsive embed-responsive-16by9"
            dangerouslySetInnerHTML={{
              __html: `
                <video
                loop
                muted
                autoplay
                controls
                playsinline
                src="${this.state.videoURL}"
                />`
            }}
          ></div>
          <div className="nadeTitleRow d-flex w-100 justify-content-between">
            <h5>{this.state.nadeTitle}</h5>
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
