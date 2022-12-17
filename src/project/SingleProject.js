import React, { useEffect, useState } from 'react'
import { axiosReq } from '../api/axiosDefaults'
import { Col, Container, Image, Row } from 'react-bootstrap'
import styles from '../assets/css/Summary.module.css'

import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Link } from 'react-router-dom'

const SingleProject = () => {
  const { id } = useParams()

  useEffect(() => {
    const HandleMount = async () => {
      try {
        const [{ data: projects }, { data: pages }] = await Promise.all([
          axiosReq.get(`/project/${id}`),
          axiosReq.get(`/pages/?project=${id}`)
        ])
        setProjects({
          projects,
          pages

        })
      } catch (err) {
        console.log(err)
        console.log('fired')
      }
    }
    HandleMount()
  }, [id])

  const [projects, setProjects] = useState({

    projects: [],
    pages: [],
    placeholderUrl: 'default-page_xo6mbk'
  })

  return (
    <Container className={styles.main__container}>
      <Row className="justify-content-center">
        {console.log(projects)}
        {projects.pages.map(page =>
          <Col xs={4} md={2} className={styles.item} key={page.id}>
            <Row>
              <Col className={styles.item__image_container}>
                <Image src={!page.letters.includes('default-page_xo6mbk', -19) ? page.letters : !page.colors.includes('default-page_xo6mbk', -19) ? page.colors : !page.inks.includes('default-page_xo6mbk', -19) ? page.inks : page.roughs} className='item__image' />
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={`/page/${page.id}`}>
                  <h2>{page.title}</h2>
                </Link>
              </Col>
            </Row>
          </Col>

        )}
      </Row>
      <Row className="justify-content-center">
        <Col>
          <Link to={`/editbook/${id}`}>edit book</Link>
        </Col>
      </Row>
    </Container >
  )
}

export default SingleProject
