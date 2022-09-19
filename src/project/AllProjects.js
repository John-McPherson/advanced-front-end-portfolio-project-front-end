import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

import { Col, Container, Image, Row } from 'react-bootstrap'
import defaultImage from "../assets/images/default-page.png"


import appStyles from "../App.module.css";
import styles from "../assets/css/Summary.module.css"
import { Link } from "react-router-dom";


const AllProjects = () => {


    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: projects }] = await Promise.all([
                    axiosReq.get(`/project/`),
                ]);
                setProjects({
                    projects: projects.filter(project => project.is_collaborator),
                })
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();

    }, []);

    const [projects, setProjects] = useState({
        projects: [],
    });

    return (
        <Container className={styles.main__container}>
            <Row>
                {projects.projects.map(project =>
                    < Col xs={2} className={styles.item} key={project.id}>
                        <Row>
                            <Col className={styles.item__image_container}>
                                <Link to={`book/${project.id}`}>

                                    <Image src={defaultImage} className='item__image' />
                                    {project.is_owner ?
                                        <Link to={`editbook/${project.id}`}>
                                            <div className={styles.item__edit_btn}>
                                                <i className="fa-solid fa-pencil"></i>
                                            </div>
                                        </Link>
                                        : ""}
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Link to={`book/${project.id}`}>
                                    <h2>{project.title}</h2>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                )
                }

            </Row>
        </Container >
    )
}

export default AllProjects