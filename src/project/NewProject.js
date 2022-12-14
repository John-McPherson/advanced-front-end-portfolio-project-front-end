import React, { useState } from 'react'
import defaultImage from '../assets/images/default-profile.svg'
import formStyles from '../assets/css/Forms.module.css'
import appStyles from '../App.module.css'
import { Form, Button, Col, Row, Container } from 'react-bootstrap'
import { axiosReq } from '../api/axiosDefaults'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Collaborators from './Collaborators'

const NewProject = () => {
  const [collaborators, setCollaborators] = useState({
    collaborators: [0, 1, 2]
  })

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
  })

  const {

    title,

    color,
    pages,
    writers,
    artists,
    colorists,
    letterers,
    editors
  } = projectData

  const [errors, setErrors] = useState({})

  const history = useHistory()

  const handleChange = (e) => {
    setprojectData({
      ...projectData,
      [e.target.name]: e.target.value
    })
  }

  const handleChecked = (e) => {
    setprojectData({
      ...projectData,
      [e.target.name]: e.target.value === 'true'
    })
  }

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
    const roleName = e.target.name
    const i = e.target.dataset.index
    role.roles[i][roleName] = e.target.value

    setRole({
      ...role
    })

    const updatedWriters = new Set()
    const updatedArtists = new Set()
    let updatedColorists = new Set()
    let updatedLetterers = new Set()
    let updatedEditors = new Set()

    for (const x of role.roles) {
      if (x.username) {
        if (x.role === 'writer') {
          updatedWriters.add(parseInt(x.username))
        } else if (x.role === 'artist') {
          updatedArtists.add(parseInt(x.username))
        } else if (x.role === 'colorist') {
          updatedColorists.add(parseInt(x.username))
        } else if (x.role === 'editor') {
          updatedEditors.add(parseInt(x.username))
        } else if (x.role === 'letterer') {
          updatedLetterers.add(parseInt(x.username))
        }
      }
    }

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
    })
  }

  const addCollab = () => {
    collaborators.collaborators = [...collaborators.collaborators, collaborators.collaborators.length]
    role.roles = [...role.roles, { role: '', username: '' }]
    setCollaborators({
      ...collaborators

    })
    setRole({
      ...role

    }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('title', title)
    formData.append('color', color)
    formData.append('pages', pages)
    if (artists.length) {
      formData.append('artists', artists)
    }
    if (writers.length) {
      formData.append('writers', writers)
    }
    if (editors.length) {
      formData.append('editors', editors)
    }
    if (colorists.length) {
      formData.append('colorists', colorists)
    }
    if (letterers.length) {
      formData.append('letterers', letterers)
    }

    try {
      const { data } = await axiosReq.post('/project/', formData)
      createPages(data.id)
      history.push(`/book/${data.id}`)
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data)
      }
    }
  }

  const createPages = (projectId) => {
    let pageNumber = 1
    const pages = [{ book: projectId, pageTitle: 'cover', pageNumber: 0 }]
    while (pageNumber <= projectData.pages) {
      const page = {
        book: projectId,
        pageTitle: 'Page ' + pageNumber,
        pageNumber
      }
      pages.push(page)
      pageNumber++
    }
    pages.map(async (page) => {
      const projectData = new FormData()
      projectData.append('page_number', page.pageNumber)
      projectData.append('title', page.pageTitle)
      projectData.append('project', projectId)

      try {
        await axiosReq.post('/pages/', projectData)
      } catch (err) {

      }
    })
  }

  return (
        <Form onSubmit={handleSubmit} className={formStyles.Form__Container__Main}>
            <Row >
                <Col className={` ${formStyles.Form__Container__Col}`} md={12}>
                    <Container className={appStyles.Remove__margins_paddings}>

                        <Form.Group controlId="title" className={formStyles.Form__Input_Group} >

                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" placeholder="enter title here..." name='title' value={title}
                                onChange={handleChange} />
                        </Form.Group>
                        {errors.title?.map((message, idx) => (
                            <p key={idx} className={formStyles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))}
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
                        {errors.pages?.map((message, idx) => (
                            <p key={idx} className={formStyles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))}
                    </Container>
                </Col>
                <Col className={` ${formStyles.Form__Container__Col}`} md={6}>
                    <Container className={appStyles.Remove__margins_paddings} >
                        <Form.Group controlId="color" >
                            <div className={formStyles.Form__Input_Group__Skills} >
                                <div>
                                    <p>Color: </p>
                                </div>
                                <Form.Check inline className={projectData.color ? formStyles.Form__Input_Group__Skills__Selected : ''} label="Yes" value={true} name="color" checked={projectData.color} type="radio" id={'color-yes'} onChange={handleChecked} />
                                <Form.Check inline className={projectData.color ? '' : formStyles.Form__Input_Group__Skills__Selected} label="No" value={false} name="color" checked={!projectData.color} type="radio" id={'color-no'} onChange={handleChecked} />
                            </div>
                        </Form.Group>
                        {errors.color?.map((message, idx) => (
                            <p key={idx} className={formStyles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))}
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
                <Row key={x}>

                    <Collaborators updateColabs={updateColabs} role={role} i={x} defaultValue={''} />

                </Row >

            )}
            {errors.writers?.map((message, idx) => (
                <p key={idx} className={formStyles.Form__Input_Warning}>
                    Writers:  {message}
                </p>
            ))}
            {errors.artists?.map((message, idx) => (
                <p key={idx} className={formStyles.Form__Input_Warning}>
                    Artists:   {message}
                </p>
            ))}
            {errors.colorists?.map((message, idx) => (
                <p key={idx} className={formStyles.Form__Input_Warning}>
                    Colorists:  {message}
                </p>
            ))}
            {errors.editors?.map((message, idx) => (
                <p key={idx} className={formStyles.Form__Input_Warning}>
                    Editors:   {message}
                </p>
            ))}        {errors.letterers?.map((message, idx) => (
                <p key={idx} className={formStyles.Form__Input_Warning}>
                    Letterers:   {message}
                </p>
            ))}
            <Row>
                <Col className={` ${formStyles.Form__Container__Col}`} md={12}>
                    <Container className={appStyles.Remove__margins_paddings} >
                        <p className={formStyles.Form__add_Collab} onClick={addCollab}>Add Collaborators</p>
                    </Container>
                </Col>

            </Row >

            <Row>
                <Col className={` ${formStyles.Form__Container__Col + ' ' + appStyles.Text_Center}`} xs={12}>
                    <Container className={appStyles.Remove__margins_paddings} >

                        <Button type="submit" className={`${appStyles.Btn + ' ' + appStyles.SmlBtn} `}>
                            add book
                        </Button>
                    </Container>
                </Col>
            </Row >
        </Form >
  )
}

export default NewProject
