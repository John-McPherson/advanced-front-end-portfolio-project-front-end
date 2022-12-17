import React, { useState, useRef, useEffect } from 'react'
import defaultImage from '../../assets/images/default-profile.svg'

import styles from '../../assets/css/SignInUpForm.module.css'
import appStyles from '../../App.module.css'

import { Form, Button, Col, Row, Container, Image } from 'react-bootstrap'
// import axios from 'axios'
import { axiosRes, axiosReq } from '../../api/axiosDefaults'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Loading from '../../components/Loading'

import {
  useCurrentUser,
  useSetCurrentUser
} from '../../contexts/CurrentUserContext'

const ProfilePage = () => {
  const currentUser = useCurrentUser()
  const setCurrentUser = useSetCurrentUser()

  useEffect(() => {
    const HandleMount = async () => {
      try {
        const [{ data: profile }] = await Promise.all([
          axiosReq.get(`/profiles/${currentUser.profile_id}`)
        ])

        setProfile({

          writer: profile.writer,
          artist: profile.artist,
          colorist: profile.colorist,
          letterer: profile.letterer,
          editor: profile.editor,
          image: profile.image,
          loaded: true
        })
        setNewUsername({
          previousUsername: profile.name,
          updatedUsername: profile.name
        }
        )
      } catch (err) {

      }
    }
    HandleMount()
  }, [])

  const imageInput = useRef(null)

  const [profileData, setProfile] = useState({

    writer: false,
    artist: false,
    colorist: false,
    letterer: false,
    editor: false,
    image: defaultImage,
    loaded: false

  })
  const [newPassword, setNewPassword] = useState({
    newPassword1: '',
    newPassword2: ''
  })
  const { newPassword1, newPassword2 } = newPassword

  const [newUsername, setNewUsername] = useState({
    previousUsername: '',
    updatedUsername: ''
  })

  const {
    previousUsername,
    updatedUsername
  } = newUsername

  const {

    writer,
    artist,
    colorist,
    letterer,
    editor
  } = profileData

  const [errors, setErrors] = useState({})

  const history = useHistory()

  const handleChangePassword = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value
    })
  }
  // const handleDelete = async (e) => {
  //   try {
  //     await axiosReq.delete(`profiles/${currentUser.profile_id}/delete`)
  //     await axios.post('/dj-rest-auth/logout/')
  //     history.push('/')
  //   } catch (err) {
  //     setErrors(err.response?.data)
  //   }
  // }

  const handleChecked = (e) => {
    setProfile({
      ...profileData,
      [e.target.name]: e.target.checked
    })
  }

  const imageHandler = (e) => {
    setProfile({
      ...profileData,
      image: URL.createObjectURL(e.target.files[0])
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', updatedUsername)
    formData.append('writer', writer)
    formData.append('artist', artist)
    formData.append('colorist', colorist)
    formData.append('letterer', letterer)
    formData.append('editor', editor)
    if (imageInput?.current?.files[0]) {
      formData.append('image', imageInput.current.files[0])
    }
    const username = new FormData()

    username.append('username', updatedUsername)
    try {
      if (!updatedUsername === previousUsername) {
        await axiosRes.put('/dj-rest-auth/user/', username)
        setCurrentUser((prevUser) => ({
          ...prevUser,
          updatedUsername
        }))
      }
      if (newPassword1) {
        await axiosRes.post('/dj-rest-auth/password/change/', newPassword)
      }

      await axiosReq.put(`/profiles/${currentUser.profile_id}/`, formData)
      history.push('/')
    } catch (err) {
      setErrors(err.response?.data)
    }
  }

  return (
    <React.Fragment>
      {profileData.loaded

        ? <Form onSubmit={handleSubmit}>
          <Row className={styles.Form__Container} >

            <Col className={` ${styles.Form__Container__Col}`} md={6}>
              <Container className={appStyles.Remove__margins_paddings} >

                <Form.Group controlId="username" className={styles.Form__Input_Group} >
                  <span><i className="fa-solid fa-user"></i></span>
                  <Form.Label className="d-none">Username</Form.Label>
                  <Form.Control type="text" placeholder="updatedUsername" name='updatedUsername' value={updatedUsername}
                    onChange={(event) => setNewUsername({ updatedUsername: event.target.value })} />
                </Form.Group>
                {errors.username?.map((message, idx) => (
                  <p key={idx} className={styles.Form__Input_Warning}>
                    {message}
                  </p>
                ))}

                <Form.Group controlId="newPassword1" className={styles.Form__Input_Group}>
                  <span><i className="fa-solid fa-lock"></i></span>
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control type="password" name='newPassword1' placeholder="password" value={newPassword1} onChange={handleChangePassword} />
                </Form.Group>
                {errors.newPassword1?.map((message, idx) => (
                  <p key={idx} className={styles.Form__Input_Warning}>
                    {message}
                  </p>
                ))}

                <Form.Group controlId="newPassword2" className={styles.Form__Input_Group}>
                  <span><i className="fa-solid fa-lock"></i></span>
                  <Form.Label className="d-none">Confirm Password</Form.Label>
                  <Form.Control type="password" name='newPassword2' placeholder="confirm password" value={newPassword2} onChange={handleChangePassword} />
                </Form.Group>

                {errors.newPassword2?.map((message, idx) => (
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
                    <Form.Check inline className={profileData.writer ? styles.Form__Input_Group__Skills__Selected : ''} label="writer" value={writer} name="writer" checked={profileData.writer} type="checkbox" id={'writer'} onChange={handleChecked} />
                    <Form.Check inline className={profileData.artist ? styles.Form__Input_Group__Skills__Selected : ''} label="artist" value={artist} name="artist" checked={profileData.artist} type="checkbox" id={'artist'} onChange={handleChecked} />
                    <Form.Check inline className={profileData.colorist ? styles.Form__Input_Group__Skills__Selected : ''} label="colorist" value={colorist} name="colorist" checked={profileData.colorist} type="checkbox" id={'colorist'} onChange={handleChecked} />
                    <Form.Check inline className={profileData.letterer ? styles.Form__Input_Group__Skills__Selected : ''} label="letterer" name="letterer" value={letterer} checked={profileData.letterer} type="checkbox" id={'letterer'} onChange={handleChecked} />
                    <Form.Check inline className={profileData.editor ? styles.Form__Input_Group__Skills__Selected : ''} label="editor" name="editor" value={editor} checked={profileData.editor} type="checkbox" id={'editor'} onChange={handleChecked} />
                  </div>
                </Form.Group>

                <Button type="submit" className={appStyles.Btn}>
                  Update Profile                        </Button>

              </Container>
            </Col>
            <Col
              md={6}
              className={`  d-md-block  ${styles.Form__Container__Col}`}>
              <Image src={profileData.image} roundedCircle className={styles.Profile__Picture} />
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

              {/* <Button onClick={handleDelete} className={appStyles.Btn}>
            Delete Profile                        </Button> */}

            </Col>
          </Row >
        </Form >
        : <Loading />
      }
    </React.Fragment >
  )
}

export default ProfilePage
