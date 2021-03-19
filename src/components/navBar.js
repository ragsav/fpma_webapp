import { useState } from "react";
import {
  InputGroup,
  Button,
  FormControl,
  Row,
  Col,
  Container,
  Nav,
  Navbar,
  Form,
  NavDropdown,
} from "react-bootstrap";

const NavBar = (props) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        width: "100%",
        textAlign: "left",
        borderRadius: 4,
        backgroundColor: "rgb(72, 47, 95)",
      }}
    >
      <Navbar.Brand href="#home" style={{  color:  "white"  }}>
        
        FPMA
      
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Button variant="outline-light" onClick={props.logOut}>
            Log out
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
