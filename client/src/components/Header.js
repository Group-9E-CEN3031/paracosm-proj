import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

class Header extends React.Component {

render(){
return(
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Paracosm</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="nav navbar-nav mx-auto">
        <Nav.Link href="#home">Upload</Nav.Link>
        <Nav.Link href="#link">View</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    )
  }
}

export default Header;
