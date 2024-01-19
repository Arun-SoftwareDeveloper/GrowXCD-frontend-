import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Styles/NavBar.css";

const NavigationBar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <i class="fa-solid fa-tag" style={{ color: "orange" }}></i>
        <Navbar.Brand href="#" style={{ color: "orange" }}>
          ARRA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto" style={{ float: "right" }}>
            <Nav.Link href="#Home" style={{ color: "dodgerblue" }}>
              Home
            </Nav.Link>
            <Nav.Link href="#categories" style={{ color: "dodgerblue" }}>
              Categories
            </Nav.Link>
            <Nav.Link href="#about" style={{ color: "dodgerblue" }}>
              About
            </Nav.Link>
            {/* <Nav.Link href="#categories">Categories</Nav.Link> */}
            <Nav.Link href="#contact" style={{ color: "dodgerblue" }}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
