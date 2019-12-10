import React, { Component } from "react";
import {Link} from 'react-router-dom'
import logo from '../../assets/paracosm.png';
import './Download.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const BASE_URL = 'http://localhost:5000';
const DEFAULT_LINK = null;

class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
          uuid: '',
          links: [DEFAULT_LINK, DEFAULT_LINK, DEFAULT_LINK]
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.getLinks = this.getLinks.bind(this);
        this.getImageLink = this.getImageLink.bind(this);
        this.getCalibrationLink = this.getCalibrationLink.bind(this);
        this.getLaunchLink = this.getLaunchLink.bind(this);
        this.getTarget = this.getTarget.bind(this);
    }

    changeHandler = event => {
      this.setState({
        uuid: event.target.value
      });

      this.getLinks(event.target.value);
    };

    getImageLink = function() {
      console.log(this.state.links);
      if(typeof(this.state.links) === 'undefined')
        return DEFAULT_LINK;

      return this.state.links[0];
    }

    getCalibrationLink = function() {
      if(typeof(this.state.links) === 'undefined')
        return DEFAULT_LINK;

      return this.state.links[1];
    }

    getLaunchLink = function() {
      if(typeof(this.state.links) === 'undefined')
        return DEFAULT_LINK;

      return this.state.links[2];
    }

    getLinks = function(uuid) {
      axios.get(BASE_URL + '/api/' + uuid)
        .then(res => {
          console.log(res);
          if(!res || !res.data)
            this.setState({links: [DEFAULT_LINK, DEFAULT_LINK, DEFAULT_LINK]});

          this.setState({links: [res.data.image, res.data.calibration, res.data.launch]});
        })
        .catch((error) => {
          console.log(error);
          this.setState({links: [DEFAULT_LINK, DEFAULT_LINK, DEFAULT_LINK]});
        });

      //this.setState({links: [DEFAULT_LINK, DEFAULT_LINK, DEFAULT_LINK]});
    };

    getTarget = function() {
      if(typeof(this.state.links) === 'undefined' || this.state.links[0] === DEFAULT_LINK)
        return "_self";

      return "_blank";
    };

    render() {

        return (

          <div className="Main-Page">
          <a class="buttonLink">
            <Link to="/Login">
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
          <form>
            <input
              placeholder="Enter UUID"
              onChange={this.changeHandler}
            />
          </form>

          <Paper className="root">
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">UUID</TableCell>
          <TableCell align="right">Image</TableCell>
          <TableCell align="right">YML</TableCell>
          <TableCell align="right">Launch</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row" align="right">{this.state.uuid}</TableCell>
          <TableCell component="th" scope="row" align="right"><a target={this.getTarget()} href={this.getImageLink()}>Download Image</a></TableCell>
          <TableCell component="th" scope="row" align="right"><a target={this.getTarget()} href={this.getCalibrationLink()}>Download Calibration</a></TableCell>
          <TableCell component="th" scope="row" align="right"><a target={this.getTarget()} href={this.getLaunchLink()}>Download Launch</a></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>
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

export default Download;
