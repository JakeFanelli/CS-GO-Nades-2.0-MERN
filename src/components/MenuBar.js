import React from "react";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Index from "./Index";
import Maps from "./Maps";
import Recoils from "./Recoils";
import Register from "./Register";
import NoMatch from "./NoMatch";

const MenuBar = props => (
  <Router>
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Link to="/" class="navbar-brand">
          CSGO NAYDESSS
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/maps" className="nav-link">
              Maps
            </Link>
            <Link to="/recoils" class="nav-link">
              Recoil Patterns
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/maps" component={Maps} />
      <Route path="/maps/:id" component={Maps} />
      <Route path="/recoils" component={Recoils} />
      <Route path="/register" component={Register} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

export default MenuBar;
