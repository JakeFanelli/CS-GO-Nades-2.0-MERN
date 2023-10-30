import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Index from "./Index";
import Maps from "./Maps";
import Recoils from "./Recoils";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";
import LoggedInOrOut from "./LoggedInOrOut";
import Account from "./Account";
import MapPage from "./MapPage";
import NadePage from "./NadePage";
import SubmitNade from "./SubmitNade";
import Donate from "./Donate";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Gfycat from "./Gfycat";
import Analytics from "react-router-ga";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  //animate nav links when clicking hamburger menu
  handleClick() {
    const navLinks = document.querySelectorAll(".navbar-collapse a");
    navLinks.forEach((link, index) => {
      link.style.animation = `navLinkFade .5s ease forwards ${index / 10}s`;
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar expand="lg" variant="dark">
            <div className="container">
              <Link to="/" className="navbar-brand">
                CS2 Nades
              </Link>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={this.handleClick}
              />
              <Navbar.Collapse id="basic-navbar-nav" ref="navbarRef">
                <Nav className="mr-auto">
                  <Link to="/maps" className="nav-link">
                    Maps
                  </Link>
                  <Link to="/submit_nade" className="nav-link">
                    Submit Nade
                  </Link>
                  <Link to="/recoils" className="nav-link">
                    Recoils Patterns
                  </Link>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.paypal.me/JacobFanelli"
                    className="nav-link"
                  >
                    Donate
                  </a>
                </Nav>
                <LoggedInOrOut
                  loggedIn={this.props.loggedIn}
                  loggedInUpdate={this.props.loggedInUpdate}
                />
              </Navbar.Collapse>
            </div>
          </Navbar>
        </div>
        <Analytics id="UA-129029364-2">
          <Switch>
            <Route
              path="/"
              exact
              render={props => <Index loggedIn={this.props.loggedIn} />}
            />
            <Route
              path="/maps/:id/:id"
              render={props => (
                <NadePage
                  {...props}
                  userSubmissionFlag={this.props.userSubmissionFlag}
                  loggedIn={this.props.loggedIn}
                  user={this.props.user}
                />
              )}
            />
            <Route
              path="/maps/:id"
              render={props => (
                <MapPage
                  {...props}
                  tOrCt={this.props.tOrCt}
                  switchSides={this.props.switchSides}
                  smokesFlag={this.props.smokesFlag}
                  flashesFlag={this.props.flashesFlag}
                  molotovsFlag={this.props.molotovsFlag}
                  smokesFlagUpdate={this.props.smokesFlagUpdate}
                  flashesFlagUpdate={this.props.flashesFlagUpdate}
                  molotovsFlagUpdate={this.props.molotovsFlagUpdate}
                  icon={this.props.icon}
                  toggleView={this.props.toggleView}
                  nadeData={this.props.nadeData}
                  updateNadeData={this.props.updateNadeData}
                  userSubmissionFlag={this.props.userSubmissionFlag}
                  userSubmissionFlagUpdate={this.props.userSubmissionFlagUpdate}
                />
              )}
            />
            <Route path="/maps" component={Maps} />
            <Route path="/recoils" component={Recoils} />
            <Route path="/donate" component={Donate} />
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  loggedIn={this.props.loggedIn}
                  loggedInUpdate={this.props.loggedInUpdate}
                  updateUser={this.props.updateUser}
                />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <Register
                  {...props}
                  loggedInUpdate={this.props.loggedInUpdate}
                  loggedIn={this.props.loggedIn}
                  updateUser={this.props.updateUser}
                />
              )}
            />
            <Route
              path="/account"
              render={props => (
                <Account
                  {...props}
                  loggedIn={this.props.loggedIn}
                  user={this.props.user}
                  updateUsername={this.props.updateUsername}
                  updateEmail={this.props.updateEmail}
                />
              )}
            />
            <Route path="/forgot_password/:id" component={ResetPassword} />
            <Route path="/forgot_password" component={ForgotPassword} />
            <Route
              path="/submit_nade"
              render={props => (
                <SubmitNade {...props} loggedIn={this.props.loggedIn} />
              )}
            />
            <Route path="/gfycat" component={Gfycat} />
            <Route component={NoMatch} />
          </Switch>
        </Analytics>
      </Router>
    );
  }
}

export default MenuBar;
