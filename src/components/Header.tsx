import React from "react";
import { Navbar, Container } from "react-bootstrap";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">DaBus</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <SearchBox />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
