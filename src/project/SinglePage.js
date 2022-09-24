import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import styles from "../assets/css/SinglePage.module.css"

const SinglePage = () => {
    const { id } = useParams();

    useEffect(() => {
        const HandleMount = async () => {
            try {
                const [{ data: pages }] = await Promise.all([
                    axiosReq.get(`/page/${id}`),
                ]);
                const [{ data: project }] = await Promise.all([

                    axiosReq.get(`/project/${pages.project}`),
                ]);
                let active = 'roughs'
                if (!pages.letters.includes('default-page_xo6mbk')) {
                    active = 'letters'
                } else if (!pages.colors.includes('default-page_xo6mbk')) {
                    active = 'colors'
                } else if (!pages.inks.includes('default-page_xo6mbk')) {
                    active = 'inks'
                }
                console.log(pages.roughs)
                setData({
                    page: pages,
                    project: project,
                    active: active,
                    roughs: pages.roughs,
                    inks: pages.inks,
                    colors: pages.colors,
                    letters: pages.letters
                })

            } catch (err) {
                console.log(err);
            }
        };

    }, [id]);

    const [data, setData] = useState({

        page: [],
        project: [],
        active: 'roughs',
        roughs: '',
        inks: '',
        colors: '',
        letters: ''


    });

    const handleChecked = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        console.log(data)


    };
    return (
        <Container className={styles.main__container} fluid>


            <Row>

                <Col xs={12} md={6}>
                    <Row>
                        <Col className={styles.imgcol}>
                            <Image src={data.active == 'roughs' ? data.roughs : data.active == 'inks' ? data.inks : data.active == 'colors' ? data.colors : data.letters} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} className={styles.pagetitle}>
                            <h2>
                                {data.project.title} - {data.page.title}
                            </h2>
                        </Col>
                        <Col xs={6} className={styles.selectorcol} >
                            <Form>
                                <Form.Group controlId="activepage" >

                                    <div className={styles.page__selecter} >
                                        <Form.Check inline className={data.active == 'roughs' ? styles.page__selecter__selected : ''} label="roughs" value={'roughs'} name="active" checked={data.active == 'roughs' ? true : false} type="checkbox" id={`roughs`} onChange={handleChecked} />
                                        <Form.Check inline className={data.active == 'inks' ? styles.page__selecter__selected : ''} label="inks" value={'inks'} name="active" checked={data.active == 'inks' ? true : false} type="checkbox" id={`inks`} onChange={handleChecked} />
                                        {data.project.color ?
                                            <Form.Check inline className={data.active == 'colors' ? styles.page__selecter__selected : ''} label="colors" value={'colors'} name="active" checked={data.active == 'colors' ? true : false} type="checkbox" id={`colors`} onChange={handleChecked} />
                                            : ''}
                                        <Form.Check inline className={data.active == 'letters' ? styles.page__selecter__selected : ''} label="letters" value={'letters'} name="active" checked={data.active == 'letters' ? true : false} type="checkbox" id={`letters`} onChange={handleChecked} />

                                    </div>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>

                </Col>
                <Col xs={12} md={6}>
                    Comment section goes here...
                </Col>
            </Row>
        </Container>

    )
}

export default SinglePage