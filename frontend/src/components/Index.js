import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountAndSupportRow from "./AccountAndSupportRow";

const Index = props => (
  <div className="container">
    <div className="row orient-right">
      <div className="rowImage col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <FontAwesomeIcon icon="map" className="spotlightIcon" size="lg" />
      </div>
      <div className="rowContent col-xs-12 col-sm-12 col-md-8 col-lg-8">
        <h3>Learn Grenades</h3>
        <p>
          Learn how to throw all important grenades as CT and T. Also cast your
          vote on user submitted grenades!
        </p>
        <Link className="btn btn-primary" to="/maps">
          Learn more
        </Link>
      </div>
    </div>
    <div className="row row2">
      <div className="rowImage col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <FontAwesomeIcon
          icon="cloud-upload-alt"
          className="spotlightIcon"
          size="lg"
        />
      </div>
      <div className="rowContent col-xs-12 col-sm-12 col-md-8 col-lg-8">
        <h3>Share Grenades</h3>
        <p>
          Have you found an awesome grenade you'd like to share? Upload it!
          Users will vote on whether it should stay!
        </p>
        <Link className="btn btn-primary" to="/submit_nade">
          Learn more
        </Link>
      </div>
    </div>
    <div className="row orient-right row3">
      <div className="rowImage col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <FontAwesomeIcon
          icon="crosshairs"
          className="spotlightIcon"
          size="lg"
        />
      </div>
      <div className="rowContent col-xs-12 col-sm-12 col-md-8 col-lg-8">
        <h3>Learn Recoils</h3>
        <p>
          Learn how to control your rifle and SMG recoil like the pros! No need
          to spray and pray anymore.
        </p>
        <Link className="btn btn-primary" to="/recoils">
          Learn more
        </Link>
      </div>
    </div>
    <AccountAndSupportRow loggedIn={props.loggedIn} />
  </div>
);

export default Index;
