import React, { useEffect, useState } from 'react'
import { axiosReq } from '../api/axiosDefaults'
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap'
import styles from '../assets/css/SinglePage.module.css'
import appStyles from '../App.module.css'
import CommentForm from './CommentForm'
import Comment from './Comment'

const SinglePage = () => {
  const { id } = useParams()

  const history = useHistory()

  const [errors, setErrors] = useState({})

  useEffect(() => {
    const HandleMount = async () => {
      try {
        const [{ data: pages }, { data: comments }] = await Promise.all([
          axiosReq.get(`/page/${id}`),
          axiosReq.get(`/comments/?page=${id}`)

        ])
        const [{ data: project }] = await Promise.all([

          axiosReq.get(`/project/${pages.project}`)
        ])
        let active = 'roughs'
        if (!pages.letters.includes('default-page_xo6mbk')) {
          active = 'letters'
        } else if (!pages.colors.includes('default-page_xo6mbk')) {
          active = 'colors'
        } else if (!pages.inks.includes('default-page_xo6mbk')) {
          active = 'inks'
        }

        setData({
          page: pages,
          project,
          active,
          roughs: pages.roughs,
          inks: pages.inks,
          colors: pages.colors,
          letters: pages.letters
        })
        setComments({
          results: comments
        })
      } catch (err) {

      }
    }
    HandleMount()
  }, [id])

  const [data, setData] = useState({

    page: [],
    project: [],
    active: 'roughs',
    roughs: '',
    roughsFile: '',
    inks: '',
    inksFile: '',
    colors: '',
    colorsFile: '',
    letters: '',
    lettersFile: ''

  })
  const [comments, setComments] = useState({

    results: []

  })

  const handleChecked = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const imageHandler = (e) => {
    const target = data.active

    setData({
      ...data,
      [target]: URL.createObjectURL(e.target.files[0]),
      [target + 'File']: e.target.files
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', data.page.title)
    formData.append('project', data.project.id)
    formData.append('page_number', data.page.page_number)
    if (data.roughsFile) {
      formData.append('roughs', data.roughsFile[0])
    }
    if (data.inksFile) {
      formData.append('inks', data.inksFile[0])
    }
    if (data.colorsFile) {
      formData.append('colors', data.colorsFile[0])
    }
    if (data.lettersFile) {
      formData.append('letters', data.lettersFile[0])
    }

    try {
      await axiosReq.put(`/page/${id}/`, formData)
      history.push(`/book/${data.project.id}/`)
    } catch (err) {
      setErrors(err.response?.data)
    }
  }

  return (
    <Container className={styles.main__container} fluid>

      <Row>

        <Col xs={12} md={6}>
          <Row>
            <Col className={styles.imgcol}>
              <Image src={data.active === 'roughs' ? data.roughs : data.active === 'inks' ? data.inks : data.active === 'colors' ? data.colors : data.letters} />
            </Col>
          </Row>
          <Row className={styles.formControls}>
            <Col xs={6} className={styles.pagetitle}>
              <h2>
                {data.project.title} - {data.page.title}
              </h2>
            </Col>
            <Col xs={6} className={styles.selectorcol} >
              <Form >
                <Form.Group controlId="activepage" >

                  <div className={styles.page__selecter} >
                    <Form.Check inline className={data.active === 'roughs' ? styles.page__selecter__selected : ''} label="roughs" value={'roughs'} name="active" checked={data.active === 'roughs'} type="checkbox" id={'roughs'} onChange={handleChecked} />
                    <Form.Check inline className={data.active === 'inks' ? styles.page__selecter__selected : ''} label="inks" value={'inks'} name="active" checked={data.active === 'inks'} type="checkbox" id={'inks'} onChange={handleChecked} />
                    {data.project.color
                      ? <Form.Check inline className={data.active === 'colors' ? styles.page__selecter__selected : ''} label="colors" value={'colors'} name="active" checked={data.active === 'colors'} type="checkbox" id={'colors'} onChange={handleChecked} />
                      : ''}
                    <Form.Check inline className={data.active === 'letters' ? styles.page__selecter__selected : ''} label="letters" value={'letters'} name="active" checked={data.active === 'letters'} type="checkbox" id={'letters'} onChange={handleChecked} />

                  </div>
                </Form.Group>
              </Form>
            </Col>
          </Row>

        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <Form.Label htmlFor='updatepage'>Update comic page</Form.Label>
                  <Form.Control className="d-none" type="file" accept="image/png, image/jpeg" name='updatepage' id='updatepage' onChange={imageHandler} />
                </div>
                <Button type="submit" className={appStyles.Btn}>
                  Submit
                </Button>

                {errors.roughs?.map((message, idx) => (
                  <p key={idx} className={styles.Form__Input_Warning}>
                    {message}
                  </p>
                ))}
              </Form>

            </Col>
          </Row>

          <Row className={styles.commentSetter}>
            <Col xs={12}>
              <CommentForm
                page={data.page.id}
                setComments={setComments} />

            </Col>
          </Row>
          <Row className={styles.comments}>
            <Col xs={12}>
              {comments.results.map((comment, ind) =>
                <Comment key={ind} content={comment.content} author={comment.owner_id} timestamp={comment.created_at} />
              )}

            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

  )
}

export default SinglePage
