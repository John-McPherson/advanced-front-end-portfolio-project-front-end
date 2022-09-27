import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Col, Container, Image, Row } from 'react-bootstrap'
import defaultImage from "../assets/images/default-page.png"
import styles from "../assets/css/Summary.module.css"
import { Link } from "react-router-dom";



const AllProjects = () => {


    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: projects }, { data: pages }] = await Promise.all([
                    axiosReq.get(`/project/`),
                    axiosReq.get(`/pages/?project=&title=cover`),
                ]);

                setProjects({
                    projects: projects.filter(project => project.is_collaborator || project.is_owner),
                    covers: pages
                })
           
            } catch (err) {
          
            }
        };
        handleMount();

    }, []);

    const [projects, setProjects] = useState({
        projects: [],
        covers: []
    });



    return (
        <Container className={styles.main__container} >

            <Row className="justify-content-center">
                {projects.projects.length ? "" : <Col xs={12} className={styles.emptyProjectContainer}>
                    <div>

                        <i className="fa-solid fa-face-sad-cry"></i>
                        <h2>{projects.project}</h2>
                        <Link to={'/addbook'}>Click here to get started</Link>
                    </div>
                </Col>
                }


                {projects.projects.map(project =>

                    < Col xs={4} md={2} className={styles.item} key={project.id} >
                        <Row>
                            <Col xs={12} className={styles.item__image_container}>

                                <Link to={`book/${project.id}`}>
                   
              
                                    <Image src={!projects.covers.filter(cover => cover.project == project.id)[0].letters.includes('default-page_xo6mbk') ? projects.covers.filter(cover => cover.project == project.id)[0].letters : !projects.covers.filter(cover => cover.project == project.id)[0].colors.includes('default-page_xo6mbk') ? projects.covers.filter(cover => cover.project == project.id)[0].colors : !projects.covers.filter(cover => cover.project == project.id)[0].inks.includes('default-page_xo6mbk') ? projects.covers.filter(cover => cover.project == project.id)[0].inks : !projects.covers.filter(cover => cover.project == project.id)[0].roughs.includes('default-page_xo6mbk') ? projects.covers.filter(cover => cover.project == project.id)[0].roughs : defaultImage} className='item__image' />
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