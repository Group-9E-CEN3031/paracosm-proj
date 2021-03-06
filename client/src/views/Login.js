import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import fire from "../config/Fire";
import logo from "./paracosm.png";
import Route from "react";
import Upload from "./FileUpload/Upload";
//import fire from '../../../server/config/Fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log(u);
        console.log(this.props)
        this.props.history.push("/Upload")
      })
      .catch(error => {
        document.getElementById("errorMessage").innerHTML =
          "ERROR: " + error.message;
        console.log(error.message);
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="Main-Page">
        <a
          className="Logo"
          target="_blank"
          rel="noopener noreferrer"
          href="https://paracosm.io"
        >
          <img className="paracosm-logo" src={logo} />
          <i
            className="fas fa-external-link-alt external-link"
            data-fa-transform="up-6"
          ></i>
        </a>

        <form>
          <div class="form-group">
            <font color="white">
              <label for="exampleInputEmail1">Email Address</label>
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Email Address..."
              />
            </font>
          </div>
          <div class="form-group">
            <font color="white">
              <label for="exampleInputPassword1">Password</label>
              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Password..."
              />
            </font>
            <font color="black">
              <p id="errorMessage">
                <strong></strong>
              </p>
            </font>
          </div>

       
            <button class="btn btn-primary" onClick={this.login}>
              Login
            </button>
       

          <button
            onClick={this.signup}
            style={{ marginLeft: "25px" }}
            className="btn btn-success"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
