import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);

    axios
      .post("/api/users/register", newUser)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Enter Name"
            onChange={this.onChange}
          />
          <label>{this.state.errors.name}</label>
          <br />
          <input
            type="email"
            name="email"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.onChange}
          />
          <label>{this.state.errors.email}</label>
          <br />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Enter Password"
            onChange={this.onChange}
          />
          <label>{this.state.errors.password}</label>
          <br />
          <input
            type="password"
            name="password2"
            value={this.state.password2}
            placeholder="Confirm Password"
            onChange={this.onChange}
          />
          <label>{this.state.errors.password2}</label>
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Register;
