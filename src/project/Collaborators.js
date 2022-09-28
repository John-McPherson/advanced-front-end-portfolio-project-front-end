import React, { useEffect, useState } from 'react'
import styles from '../assets/css/Forms.module.css'
import appStyles from '../App.module.css'
import { axiosReq } from '../api/axiosDefaults'
import PropTypes from 'prop-types'
import { Form, Col, Container } from 'react-bootstrap'

const Collaborators = ({ updateColabs, role, i }) => {
  Collaborators.propTypes = {
    updateColabs: PropTypes.func,
    i: PropTypes.number,
    role: PropTypes.object
  }
  const [creators, setCreators] = useState({
    artists: [],
    writers: [],
    editors: [],
    colorists: [],
    letterers: []

  })

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: profiles }] = await Promise.all([
          axiosReq.get('/profiles/')
        ])

        setCreators({
          artists: [profiles.filter(profile => profile.artist)],
          writers: [profiles.filter(profile => profile.writer)],
          editors: [profiles.filter(profile => profile.editor)],
          colorists: [profiles.filter(profile => profile.colorist)],
          letterers: [profiles.filter(profile => profile.letterer)]
        })
      } catch (err) {

      }
    }
    handleMount()
  }, [])

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
              {role.roles[i].role === 'writer'
                ? creators.writers[0].map((type) => <option value={type.id} key={type.id}>{type.name}</option>)
                : role.roles[i].role === 'artist'
                  ? creators.artists[0].map((type) => <option value={type.id} key={type.id}>{type.name}</option>)
                  : role.roles[i].role === 'colorist'
                    ? creators.colorists[0].map((type) => <option value={type.id} key={type.id}>{type.name}</option>)
                    : role.roles[i].role === 'letterer'
                      ? creators.letterers[0].map((type) => <option value={type.id} key={type.id}>{type.name}</option>)
                      : role.roles[i].role === 'editor' ? creators.editors[0].map((type) => <option value={type.id} key={type.id}>{type.name}</option>) : ''}

            </Form.Control>
          </Form.Group>

        </Container>
      </Col>

    </>
  )
}

export default Collaborators
