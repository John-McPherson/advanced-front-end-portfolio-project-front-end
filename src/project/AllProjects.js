import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

import { Col, Container, Image, Row } from 'react-bootstrap'
import defaultImage from "../assets/images/default-page.png"


import appStyles from "../App.module.css";
import styles from "../assets/css/Summary.module.css"


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
                                <Image src={defaultImage} className='item__image' />
                                {project.is_owner ?
                                    <div className={styles.item__edit_btn}>
                                        <i className="fa-solid fa-pencil"></i>
                                    </div>
                                    : ""}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>{project.title}</h2>
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