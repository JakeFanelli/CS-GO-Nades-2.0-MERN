import React, { Component } from "react";
import ThumbIcon from "./ThumbIcon";

class LikesDislikes extends Component {
  render() {
    return (
      <span className="mb-1">
        <div>
          <span className="thumbs-up-icon-span">
            <span className="numLikes">{this.props.likes}</span>
            <ThumbIcon
              icon="thumbs-up"
              classname={this.props.userLikes}
              toggleView={this.props.like}
            />
          </span>
          <span className="thumbs-down-icon-span">
            <span className="numDislikes">{this.props.dislikes}</span>
            <ThumbIcon
              icon="thumbs-down"
              classname={this.props.userDislikes}
              toggleView={this.props.dislike}
            />
          </span>
        </div>
      </span>
    );
  }
}

export default LikesDislikes;
