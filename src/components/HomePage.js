import React from 'react'
import appStyles from "../App.module.css";
import styles from "../assets/css/HomePage.module.css"
import { NavLink } from 'react-router-dom'
import { Form, Button, Col, Row, Container } from "react-bootstrap";

import { useCurrentUser } from "../contexts/CurrentUserContext";
import AllProjects from '../project/AllProjects';
export const HomePage = () => {

    const currentUser = useCurrentUser();


    return (

        <div>
            {currentUser ? <AllProjects /> :
                <div className={styles.Homepage__LoggedOut} >
                    <NavLink to='/signin' className={appStyles.btn}>
                        <Button type="submit" className={appStyles.Btn}>

                            <i className="fas fa-sign-up-alt"></i><span>sign in</span>
                        </Button>
                    </NavLink>
                    <NavLink to='/signup' className={appStyles.btn}>
                        <Button type="submit" className={appStyles.Btn}>

                            <i className="fas fa-sign-up-alt"></i><span>sign up</span>
                        </Button>
                    </NavLink>
                </div>
            }
        </div>
    )
}
