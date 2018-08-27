import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <p>I am navbar</p>
        <Link to="/register">sign up</Link>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default Navbar;
