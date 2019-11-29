import React, { Component } from "react";
import {Link} from 'react-router-dom'
import logo from '../../assets/paracosm.png';
import './Download.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        return (
          <div className="Main-Page">
          <a class="buttonLink">
            <Link to="/Home">
              <button class="logoutButton" type="button">
                Logout
              </button>
            </Link>
          </a>
          <a class="buttonDownload">
          <Link to="/Upload">
            <button class="logoutButton" type="button">
              Upload
            </button>
          </Link>
          </a>
          <tr>
       <td>
       <a class="hyperLink" href="https://console.aws.amazon.com/s3/home?region=us-east-2#" target="_blank">View AWS Bucket</a>
       </td>
    </tr>
          <a className="Logo" target='_blank' rel="noopener noreferrer" href="https://paracosm.io">
            <img className="paracosm-logo" alt="" src={logo} />
            <i className="fas fa-external-link-alt external-link" data-fa-transform="up-6"></i>
          </a>

          </div>
        );
    }
}

export default Home;
