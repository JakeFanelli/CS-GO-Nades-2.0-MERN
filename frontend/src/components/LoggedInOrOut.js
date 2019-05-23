import React from "react";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";

const LoggedInOrOut = props => {
  //if user is logged in we'll show them Logout and My Account, and if
  //not we'll show them Login and Register, otherwise be blank
  //blank is for when browser is refreshed when user is logged in
  if (props.loggedIn === true) {
    return <LoggedInNav loggedInUpdate={props.loggedInUpdate} />;
  } else if (props.loggedIn === false) {
    return <LoggedOutNav loggedInUpdate={props.loggedInUpdate} />;
  } else {
    return null;
  }
};
export default LoggedInOrOut;
