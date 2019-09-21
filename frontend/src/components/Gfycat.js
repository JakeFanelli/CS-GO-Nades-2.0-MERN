import React, { Component } from "react";

class Gfycat extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="mapTitle">Instructions</h2>
        <form>
          <div className="form-group">
            <p>1. Record yourself throwing the grenade</p>
            <p>
              2. Visit <a href="https://gfycat.com">https://gfycat.com</a> and
              upload your file
            </p>
            <p>3. Once finished, visit the link they supplied you</p>
            <p>4. Change the quality of the video from SD to HD</p>
            <p>5. Right click the video and choose 'Open video in new tab'</p>
            <p>6. Use the URL in the newly opened tab for the Gfycat field</p>
          </div>
        </form>
      </div>
    );
  }
}
export default Gfycat;
