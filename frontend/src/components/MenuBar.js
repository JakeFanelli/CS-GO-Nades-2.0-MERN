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
          <Navbar bg="dark" expand="lg" variant="dark">
            <div className="container">
              <Link to="/" className="navbar-brand">
                CS:GO Nades
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
                  <Link to="/recoils" className="nav-link">
                    Recoil Patterns
                  </Link>
                </Nav>
                <LoggedInOrOut
                  loggedIn={this.props.loggedIn}
                  loggedInUpdate={this.props.loggedInUpdate}
                />
              </Navbar.Collapse>
            </div>
          </Navbar>
        </div>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/maps" component={Maps} />
          <Route path="/maps/:id" component={Maps} />
          <Route path="/recoils" component={Recoils} />
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                loggedIn={this.props.loggedIn}
                loggedInUpdate={this.props.loggedInUpdate}
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
              />
            )}
          />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default MenuBar;
