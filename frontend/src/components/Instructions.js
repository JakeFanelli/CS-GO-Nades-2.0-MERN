import React, { Component } from "react";

class Instructions extends Component {
  render() {
    return (
      <div className="container">
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
              3. Once finished, get the embed link by right clicking the video.
              It's a small portion of the copied code. For example:
              https://www.youtube.com/embed/oWoG3uag1i0
            </p>
            <p>6. Use the embed URL in the Youtube field</p>
          </div>
        </form>
      </div>
    );
  }
}
export default Instructions;
