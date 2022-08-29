import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/images/makecomics-logo.svg";
import styles from "../assets/css/NavBar.module.css";

const NavBar = () => {
    return (
        <Navbar expand="md" fixed="top" className={styles.NavBar}>
            <Container className={styles.NavBar__container}>
                <Navbar.Brand className={styles.NavBar__logo}>
                    <img src={logo} alt="logo" height="20" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.NavBar__toggle} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className={styles.NavBar__link}>
                            <i className="fas fa-book"></i>my books
                        </Nav.Link>
                        <Nav.Link className={styles.NavBar__link}>
                            <i className="fas fa-folder-plus"></i>add book
                        </Nav.Link>
                        <Nav.Link className={styles.NavBar__link}>
                            <i className="fas fa-user"></i>my profile
                        </Nav.Link>
                        <Nav.Link className={styles.NavBar__link}>
                            <i className="fas fa-sign-in-alt"></i>log out
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;