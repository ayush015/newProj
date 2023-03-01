import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../../routes/helper/apicalls";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const Header = ({ history }) => {
  const loginLogout = () => {
    return isAuthenticated() ? (
      <>
        <Nav className="me-auto">
          <Nav.Link>
            <Button
              variant="danger"
              onClick={() => {
                signout(() => {
                  history.push("/login");
                });
              }}
            >
              Logout
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button variant="info">
              <Link
                to="/new/article"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Create
              </Link>
            </Button>
          </Nav.Link>
        </Nav>
      </>
    ) : (
      <>
        <Nav.Link className="mt-bottom mt-r">
          <Button variant="secondary">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              Blogs
            </Link>
          </Button>
        </Nav.Link>
        <Nav.Link className="mt-bottom mt-r">
          <Button variant="primary">
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Log In
            </Link>
          </Button>
        </Nav.Link>
        <Nav.Link>
          <Button variant="primary">
            <Link
              to="/signup"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Sign In
            </Link>
          </Button>
        </Nav.Link>
      </>
    );
  };

  const navBar = () => {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Wordcrafters</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>{loginLogout()}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  return navBar();
};

export default withRouter(Header);
