import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Index from "./Index";
import Maps from "./Maps";
import Recoils from "./Recoils";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

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
                <LoggedInOrOut loggedIn={this.props.loggedIn} />
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
          <Route path="/register" component={Register} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

const LoggedInOrOut = props => {
  if (props.loggedIn) {
    return (
      <Nav>
        <Link to="/account" className="nav-link">
          My Account
        </Link>
        <Link to="/logout" className="nav-link">
          Logout
        </Link>
      </Nav>
    );
  } else {
    return (
      <Nav>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </Nav>
    );
  }
};

export default MenuBar;
