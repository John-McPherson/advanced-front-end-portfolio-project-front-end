import React from "react";
import styles from "../assets/css/Forms.module.css"
import appStyles from "../App.module.css";



import { Form, Col, Container } from "react-bootstrap";

const Collaborators = ({ updateColabs, role, i }) => {






    // const updateColabs = (e) => {
    //     setRole({
    //         ...role,
    //         [e.target.name]: e.target.value,
    //     });


    // };

    const writers = [
        { username: 'John' }, { username: 'Jack' }, { username: 'Jim' }, { username: 'James' },
    ]
    const artists = [
        { username: 'Jill' }, { username: 'Sandra' }, { username: 'kevin' }, { username: 'Tim' },
    ]
    const letterers = [
        { username: 'blambot' }, { username: 'Sandra' }, { username: 'kevin' }, { username: 'Tim' },
    ]
    const colorists = [
        { username: 'Shan' }, { username: 'Sandra' }, { username: 'kevin' }, { username: 'Tim' },
    ]
    const editors = [
        { username: 'Linda' }, { username: 'Sandra' }, { username: 'kevin' }, { username: 'Tim' },
    ]



    return (
        <>
            <Col className={` ${styles.Form__Container__Col}`} xs={6}>
                <Container className={appStyles.Remove__margins_paddings} >
                    <Form.Group controlId="roleSelect" className={styles.Form__Input_Group}>
                        <Form.Label className="d-none">Select Role</Form.Label>
                        <Form.Control as="select" value={role.roles[i].role} name='role' onChange={updateColabs} data-index={i}>
                            <option disabled selected value={''}> -- select a role -- </option>
                            <option value={'writer'}>Writer</option>
                            <option value={'artist'}>Artist</option>
                            <option value={'colorist'}>Colorist</option>
                            <option value={'letterer'}>Letterer</option>
                            <option value={'editor'}>Editor</option>
                        </Form.Control>
                    </Form.Group>
                </Container>
            </Col>
            <Col className={` ${styles.Form__Container__Col}`} xs={6}>
                <Container className={appStyles.Remove__margins_paddings} >
                    <Form.Group controlId="collabSelect" className={styles.Form__Input_Group}>
                        <Form.Label className="d-none">select collaborator</Form.Label>
                        <Form.Control as="select" value={role.roles[i].username} name='username' onChange={updateColabs} data-index={i}>
                            <option disabled selected value={''}> -- select a collaborator -- </option>
                            {role.roles[i].role == 'writer' ? writers.map((type) => <option value={type.username}>{type.username}</option>) : role.roles[i].role == 'artist' ? artists.map((type) => <option value={type.username}>{type.username}</option>) :
                                role.roles[i].role == 'colorist' ? colorists.map((type) => <option value={type.username}>{type.username}</option>) :
                                    role.roles[i].role == 'letterer' ? letterers.map((type) => <option value={type.username}>{type.username}</option>) :
                                        role.roles[i].role == 'letterer' ? editors.map((type) => <option value={type.username}>{type.username}</option>) : ''}


                        </Form.Control>
                    </Form.Group>
                </Container>
            </Col>



        </>
    )
}

export default Collaborators