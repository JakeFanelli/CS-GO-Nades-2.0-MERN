import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const LoggedOutNav = props => (
  <Nav>
    <Link to="/login" className="nav-link">
      Login
    </Link>
    <Link to="/register" className="nav-link">
      Register
    </Link>
  </Nav>
);

export default LoggedOutNav;
