import React, { Component } from "react";
import {Link} from 'react-router-dom'
import logo from '../../assets/paracosm.png';
import './Home.css';
//import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        return (
          <div className="Main-Page">
            <a className="Logo" target='_blank' rel="noopener noreferrer" href="https://paracosm.io">
                <img className="paracosm-logo" src={logo} />
                <i className="fas fa-external-link-alt external-link" data-fa-transform="up-6"></i>
            </a>
            <text>Username</text>
            <p><input  type="login" name="E-MAIL" id="E-MAIL" /></p>
            <text>Password</text>
            <p><input type="login" name="Password" id="Password" /></p>
            <a class="Buttons">
              <Link to="/Upload">
                <button className="buttonLogin">
                  Login
                </button>
              </Link>
              <Link to="/Register">
                <button className="buttonRegister" type="button">
                  Register
                </button>
              </Link>
            </a>
          </div>
        );
    }
}

export default Home;
