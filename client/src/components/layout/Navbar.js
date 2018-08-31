import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLiks = (
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <a href="" onClick={this.onLogoutClick.bind(this)}>
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            style={{ width: "25px", marginRight: "5px" }}
          />
          Logout
        </a>
      </div>
    );

    const guestLiks = (
      <div>
        <Link to="/register">sign up</Link>
        <Link to="/login">Login</Link>
      </div>
    );

    return (
      <div>
        <p>I am navbar</p>
        {isAuthenticated ? authLiks : guestLiks}
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
