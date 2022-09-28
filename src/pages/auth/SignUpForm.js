import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../../assets/images/default-profile.svg'

import styles from '../../assets/css/SignInUpForm.module.css'
import appStyles from '../../App.module.css'

import { Form, Button, Col, Row, Container, Image } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSetCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults'

const SignUpForm = () => {
  const setCurrentUser = useSetCurrentUser()
  const imageInput = useRef(null)

  const [signUpData, setSignUpData] = useState({
    username: '',
    password1: '',
    password2: '',
    writer: false,
    artist: false,
    colorist: false,
    letterer: false,
    editor: false,
    image: defaultImage
  })

  const [signInData, setsignInData] = useState({
    username: '',
    password: ''

  })

  const {
    username,

    password1,
    password2,
    writer,
    artist,
    colorist,
    letterer,
    editor
  } = signUpData

  const [errors, setErrors] = useState({})

  const history = useHistory()

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value

    })
    setsignInData({
      ...signInData,
      password: signUpData.password1,
      username: signUpData.username

    })
  }

  const handleChecked = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.checked
    })
  }

  const imageHandler = (e) => {
    setSignUpData({
      ...signUpData,
      image: URL.createObjectURL(e.target.files[0])
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', username)
    formData.append('writer', writer)
    formData.append('artist', artist)
    formData.append('colorist', colorist)
    formData.append('letterer', letterer)
    formData.append('editor', editor)
    if (imageInput?.current?.files[0]) {
      formData.append('image', imageInput.current.files[0])
    }

    try {
      const { data } = await axios.post('/dj-rest-auth/registration/', signUpData)
      await axios.post('/dj-rest-auth/login/', signInData)
      setCurrentUser(data.user)

      await axiosReq.put(`/profiles/${data.user.profile_id}/`, formData)
      history.push('/')
    } catch (err) {
      setErrors(err.response?.data)
    }
  }

  return (
        <Form onSubmit={handleSubmit}>
            <Row className={styles.Form__Container} >

                <Col className={` ${styles.Form__Container__Col}`} md={6}>
                    <Container className={appStyles.Remove__margins_paddings} >

                        <Form.Group controlId="username" className={styles.Form__Input_Group} >
                            <span><i className="fa-solid fa-user"></i></span>
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control type="text" placeholder="username" name='username' value={username}
                                onChange={handleChange} />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <p key={idx} className={styles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))}

                        <Form.Group controlId="password1" className={styles.Form__Input_Group}>
                            <span><i className="fa-solid fa-lock"></i></span>
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control type="password" name='password1' placeholder="password" value={password1} onChange={handleChange} />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <p key={idx} className={styles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))}

                        <Form.Group controlId="password2" className={styles.Form__Input_Group}>
                            <span><i className="fa-solid fa-lock"></i></span>
                            <Form.Label className="d-none">Confirm Password</Form.Label>
                            <Form.Control type="password" name='password2' placeholder="confirm password" value={password2} onChange={handleChange} />
                        </Form.Group>

                        {errors.password2?.map((message, idx) => (
                            <p key={idx} className={styles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))}
                        <Form.Group controlId="skillset" >
                            <div className={styles.Form__Input_Group}>
                                <span><i className="fa-solid fa-pen-ruler"></i></span>
                                <div>
                                    <p>skills</p>
                                </div>
                            </div>
                            <div className={styles.Form__Input_Group__Skills} >
                                <Form.Check inline className={signUpData.writer ? styles.Form__Input_Group__Skills__Selected : ''} label="writer" value={writer} name="writer" checked={signUpData.writer} type="checkbox" id={'writer'} onChange={handleChecked} />
                                <Form.Check inline className={signUpData.artist ? styles.Form__Input_Group__Skills__Selected : ''} label="artist" value={artist} name="artist" checked={signUpData.artist} type="checkbox" id={'artist'} onChange={handleChecked} />
                                <Form.Check inline className={signUpData.colorist ? styles.Form__Input_Group__Skills__Selected : ''} label="colorist" value={colorist} name="colorist" checked={signUpData.colorist} type="checkbox" id={'colorist'} onChange={handleChecked} />
                                <Form.Check inline className={signUpData.letterer ? styles.Form__Input_Group__Skills__Selected : ''} label="letterer" name="letterer" value={letterer} checked={signUpData.letterer} type="checkbox" id={'letterer'} onChange={handleChecked} />
                                <Form.Check inline className={signUpData.editor ? styles.Form__Input_Group__Skills__Selected : ''} label="editor" name="editor" value={editor} checked={signUpData.editor} type="checkbox" id={'editor'} onChange={handleChecked} />
                            </div>
                        </Form.Group>

                        <Button type="submit" className={appStyles.Btn}>
                            sign up
                        </Button>

                    </Container>
                    <Container className={styles.Link__Container}>
                        <Link className={styles.Form__Link} to="/signin">
                            Already have an account? <span>Sign in</span>
                        </Link>
                    </Container>
                </Col>
                <Col
                    md={6}
                    className={`  d-md-block  ${styles.Form__Container__Col}`}>
                    <Image src={signUpData.image} roundedCircle className={styles.Profile__Picture} />
                    <Container>

                        <Form.Group controlId="profilepic" className={styles.Form__Input_Group}>
                            <span><i className="fa-solid fa-pen-ruler"></i></span>
                            <Form.Label className="d-none">Profile Picture</Form.Label>
                            <Form.Control type="file" accept="image/png, image/jpeg" name='profilepic' ref={imageInput} onChange={imageHandler} />
                            {errors.image?.map((message, idx) => (
                                <p key={idx} className={styles.Form__Input_Warning}>
                                    {message}
                                </p>
                            ))}
                        </Form.Group>
                    </Container>

                </Col>
            </Row >
        </Form >
  )
}

export default SignUpForm
