import React from "react";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Index from "./Index";
import Maps from "./Maps";
import Recoils from "./Recoils";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";

const MenuBar = () => (
  <Router>
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Link to="/" className="navbar-brand">
          CS:GO Nades
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/maps" className="nav-link">
              Maps
            </Link>
            <Link to="/recoils" className="nav-link">
              Recoil Patterns
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
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
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

export default MenuBar;
