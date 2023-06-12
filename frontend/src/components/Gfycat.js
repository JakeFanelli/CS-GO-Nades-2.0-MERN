import React, { Component } from "react";

class Gfycat extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="mapTitle">Gfycat Instructions</h2>
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
        <h2 className="mapTitle">YouTube Instructions</h2>
        <form>
          <div className="form-group">
            <p>1. Record yourself throwing the grenade</p>
            <p>
              2. Visit{" "}
              <a href="https://www.youtube.com">https://www.youtube.com</a> and
              upload your file
            </p>
            <p>
              3. Once finished, get the embed link by right clicking the video
            </p>
            <p>6. Use the URL in the Gfycat/Youtube field</p>
          </div>
        </form>
      </div>
    );
  }
}
export default Gfycat;
