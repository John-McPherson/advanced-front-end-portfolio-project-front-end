import React, { useEffect, useState } from "react";
import styles from "../assets/css/Forms.module.css"
import appStyles from "../App.module.css";
import { axiosReq } from "../api/axiosDefaults";



import { Form, Col, Container } from "react-bootstrap";

const Collaborators = ({ updateColabs, role, i }) => {


    const [creators, setCreators] = useState({
        artists: [],
        writers: [],
        editors: [],
        colorists: [],
        letterers: [],

    });


    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: profiles }] = await Promise.all([
                    axiosReq.get(`/profiles/`),
                ]);
                console.log('run')
                setCreators({
                    artists: [profiles.results.filter(profile => profile.artist)],
                    writers: [profiles.results.filter(profile => profile.writer)],
                    editors: [profiles.results.filter(profile => profile.editor)],
                    colorists: [profiles.results.filter(profile => profile.colorist)],
                    letterers: [profiles.results.filter(profile => profile.letterer)],
                })

                // console.log(creators.artists)
                // profiles.results.forEach(profile => {
                //     if (profile.artist) {
                //         console.log(profile)
                //     }
                // });
                // console.log(profiles.results);

            } catch (err) {
                console.log(err);
            }
        };
        handleMount();

    }, []);



    const test = (e) => {
        creators.artists[0].map((type) => console.log(type))
    };

    const writers = [
        { username: 'John' }, { username: 'Jack' }, { username: 'Jim' }, { username: 'James' },
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
                            <option disabled value={''}> -- select a role -- </option>
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
                            <option disabled value={''}> -- select a collaborator -- </option>
                            {role.roles[i].role == 'writer' ? creators.writers[0].map((type) => <option value={type.name} key={type.id}>{type.name}</option>) :
                                role.roles[i].role == 'artist' ? creators.artists[0].map((type) => <option value={type.id} key={type.id}>{type.name}</option>) :
                                    role.roles[i].role == 'colorist' ? creators.colorists[0].map((type) => <option value={type.id} key={type.id}>{type.name}</option>) :
                                        role.roles[i].role == 'letterer' ? creators.letterers[0].map((type) => <option value={type.name} key={type.id}>{type.name}</option>) :
                                            role.roles[i].role == 'editor' ? creators.editors[0].map((type) => <option value={type.name} key={type.id}>{type.name}</option>) : ''}


                        </Form.Control>
                    </Form.Group>

                </Container>
            </Col>



        </>
    )
}

export default Collaborators