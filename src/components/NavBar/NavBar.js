import React from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';


function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/"></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto nav">
      <Link to="/home" className="btn btn-success m-2 ">Home</Link>
        <Link to="/signup" className="btn btn-success m-2 ">Signup</Link>
        <Link to="/login" className="btn btn-success m-2">Login</Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}

export default NavBar;