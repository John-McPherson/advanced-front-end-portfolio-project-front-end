import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import logo from '../assets/images/makecomics-logo.svg'
import styles from '../assets/css/NavBar.module.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import useClickOutsideToggle from '../hooks/useClickOutsideToggle'

import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'

const NavBar = () => {
  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()

  const { expanded, setExpanded, ref } = useClickOutsideToggle()

  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/')
      setCurrentUser(null)
    } catch (err) {

    }
  }

  return (
        <Navbar expanded={expanded} expand="md" fixed="top" className={styles.NavBar}>
            <Container className={styles.NavBar__container}>
                <NavLink to='/'>
                    <Navbar.Brand className={styles.NavBar__logo}>
                        <img src={logo} alt="logo" height="20" />
                    </Navbar.Brand>
                </NavLink>
                {currentUser
                  ? <>
                        <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" className={styles.NavBar__toggle} />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">

                                <NavLink exact to='/' className={styles.NavBar__link} activeClassName={styles.Active}>
                                    <i className="fas fa-book"></i><span>my books</span>
                                </NavLink>

                                <NavLink to='/addbook' className={styles.NavBar__link} activeClassName={styles.Active}>
                                    <i className="fas fa-folder-plus"></i><span>add book</span>
                                </NavLink>
                                <NavLink to='/myprofile' className={styles.NavBar__link} activeClassName={styles.Active}>
                                    <i className="fas fa-user"></i><span>my profile</span>
                                </NavLink>
                                <NavLink to='/' className={styles.NavBar__link} onClick={handleSignOut}>
                                    <i className="fas fa-sign-out-alt"></i><span>log out</span>
                                </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </>

                  : ''
                }

            </Container>
        </Navbar>
  )
}

export default NavBar
