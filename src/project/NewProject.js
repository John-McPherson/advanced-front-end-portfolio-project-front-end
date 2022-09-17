import React, { useState } from "react";
// import { Link } from "react-router-dom";
import defaultImage from "../assets/images/default-profile.svg"

import formStyles from "../assets/css/Forms.module.css"

import appStyles from "../App.module.css";

import { Form, Button, Col, Row, Container } from "react-bootstrap";
// import axios from 'axios';
// import { axiosReq } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import Collaborators from "./Collaborators";

const NewProject = () => {

    const setCurrentUser = useSetCurrentUser();

    const [collaborators, setCollaborators] = useState({
        collaborators: [0, 1, 2],
    });



    const [projectData, setprojectData] = useState({
        owner: '',
        title: '',
        color: false,
        pages: 22,
        writers: [],
        artists: [],
        colorists: [],
        letterers: [],
        editors: [],
        image: defaultImage
    });


    const { username,

        title,
        owner,
        color,
        pages,
        writers,
        artists,
        colorists,
        letterers,
        editors,
        image } = projectData;




    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (e) => {
        setprojectData({
            ...projectData,
            [e.target.name]: e.target.value,
        });
    };


    const handleChecked = (e) => {
        setprojectData({
            ...projectData,
            [e.target.name]: e.target.value == 'true' ? true : false
        });
    };




    const [role, setRole] = useState({
        roles: [{
            role: '',
            username: ''
        }, {
            role: '',
            username: ''
        }, {
            role: '',
            username: ''
        }
        ]
    })

    const updateColabs = (e) => {
        let roleName = e.target.name;
        let i = e.target.dataset.index
        role.roles[i][roleName] = e.target.value


        setRole({
            ...role,
            // roles[0].[e.target.name]: e.target.value,
        });

        let updatedWriters = new Set();
        let updatedArtists = new Set();
        let updatedColorists = new Set();
        let updatedLetterers = new Set();
        let updatedEditors = new Set();

        for (let x of role.roles) {
            if (x.username) {

                if (x.role == 'writer') {
                    updatedWriters.add(x.username);
                } else if (x.role == 'artist') {
                    updatedArtists.add(x.username);
                } else if (x.role == 'colorist') {
                    updatedColorists.add(x.username);
                } else if (x.role == 'editor') {
                    updatedEditors.add(x.username);
                }
            }
        }


        // updatedWriters = [...updatedWriters]
        // updatedArtists = [...updatedArtists]
        updatedColorists = [...updatedColorists]
        updatedLetterers = [...updatedLetterers]
        updatedEditors = [...updatedEditors]


        setprojectData({
            ...projectData,
            writers: [...updatedWriters],
            artists: [...updatedArtists],
            colorists: [...updatedColorists],
            letterers: [...updatedLetterers],
            editors: [...updatedEditors]
        });
        console.log(projectData)

    };

    const addCollab = (e) => {
        collaborators.collaborators = [...collaborators.collaborators, collaborators.collaborators.length]
        role.roles = [...role.roles, { role: '', username: '' }]
        setCollaborators({
            ...collaborators,

        });
        setRole({
            ...role,

        }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(projectData)

            // const { data } = await axios.post("/dj-rest-auth/registration/", projectData)
            // setCurrentUser(data.user)

            // await axiosReq.put(`/profiles/${data.user.profile_id}/`, formData)
            // history.push("/");
        } catch (err) {

            setErrors(err.response?.data);

        }
    }




    return (
        <Form onSubmit={handleSubmit} className={formStyles.Form__Container__Main}>
            <Row  >
                <Col className={` ${formStyles.Form__Container__Col}`} md={12}>
                    <Container className={appStyles.Remove__margins_paddings}>

                        <Form.Group controlId="title" className={formStyles.Form__Input_Group} >

                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" placeholder="enter title here..." name='title' value={title}
                                onChange={handleChange} />
                        </Form.Group>
                        {/* {errors.title?.map((message, idx) => (
                            <p key={idx} className={styles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))} */}
                    </Container>
                </Col>
            </Row>
            <Row>


                <Col className={` ${formStyles.Form__Container__Col}`} md={6}>
                    <Container className={appStyles.Remove__margins_paddings} >
                        <Form.Group controlId="pages" className={formStyles.Form__Input_Group}>

                            <Form.Label>Pages</Form.Label>
                            <Form.Control type="number" name='pages' value={pages} onChange={handleChange} />
                        </Form.Group>
                        {/* {errors.pages?.map((message, idx) => (
                            <p key={idx} className={styles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))} */}
                    </Container>
                </Col>
                <Col className={` ${formStyles.Form__Container__Col}`} md={6}>
                    <Container className={appStyles.Remove__margins_paddings} >
                        <Form.Group controlId="color" >
                            <div className={formStyles.Form__Input_Group__Skills} >
                                <div>
                                    <p>Color: </p>
                                </div>
                                <Form.Check inline className={projectData.color ? formStyles.Form__Input_Group__Skills__Selected : ''} label="Yes" value={true} name="color" checked={projectData.color} type="radio" id={`color-yes`} onChange={handleChecked} />
                                <Form.Check inline className={projectData.color ? '' : formStyles.Form__Input_Group__Skills__Selected} label="No" value={false} name="color" checked={!projectData.color} type="radio" id={`color-no`} onChange={handleChecked} />
                            </div>
                        </Form.Group>
                        {/* {errors.pages?.map((message, idx) => (
                            <p key={idx} className={styles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))} */}
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col className={` ${formStyles.Form__Container__Col__Colab}`} md={12}>
                    <Container className={appStyles.Remove__margins_paddings} >

                        <p>Collaborators: </p>
                    </Container>
                </Col>
            </Row >
            {collaborators.collaborators.map(x =>
                <Row>


                    <Collaborators updateColabs={updateColabs} role={role} i={x} />



                </Row >

            )}
            <Row>
                <Col className={` ${formStyles.Form__Container__Col}`} md={12}>
                    <Container className={appStyles.Remove__margins_paddings} >
                        <p className={formStyles.Form__add_Collab} onClick={addCollab}>Add Collaborators</p>
                    </Container>
                </Col>

            </Row >

            <Row>
                <Col className={` ${formStyles.Form__Container__Col + " " + appStyles.Text_Center}`} xs={12}>
                    <Container className={appStyles.Remove__margins_paddings} >

                        <Button type="submit" className={`${appStyles.Btn + " " + appStyles.SmlBtn} `}>
                            add book
                        </Button>
                    </Container>
                </Col>
            </Row >
        </Form >
    );
};

export default NewProject;