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

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('44122231', '44122231-upload.jpg', '44122231-upload.YML', '44122231-upload.ROS'),
  createData('12218998', '12218998-upload.jpg', '12218998-upload.YML', '12218998-upload.ROS'),
  createData('45547898', '45547898-upload.jpg', '45547898-upload.YML', '45547898-upload.ROS'),
  createData('23219870', '23219870-upload.jpg', '23219870-upload.YML', '23219870-upload.ROS'),
  createData('23211121', '23211121-upload.jpg', '23211121-upload.YML', '23211121-upload.ROS'),
  createData('90908776', '90908776-upload.jpg', '90908776-upload.YML', '90908776-upload.ROS'),
  createData('45123489', '45123489-upload.jpg', '45123489-upload.YML', '45123489-upload.ROS')
];

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
          <Paper className="root">
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">UUID</TableCell>
          <TableCell align="right">Image</TableCell>
          <TableCell align="right">YML</TableCell>
          <TableCell align="right">ROS</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
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

export default Home;
