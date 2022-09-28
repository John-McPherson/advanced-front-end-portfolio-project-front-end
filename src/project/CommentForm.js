import React, { useState } from 'react'
import { Form, Image, InputGroup } from 'react-bootstrap'
import defaultImage from '../assets/images/default-profile.svg'
import { axiosRes } from '../api/axiosDefaults'
import styles from '../assets/css/Comment.module.css'
import PropTypes from 'prop-types'
import {
  useCurrentUser
} from '../contexts/CurrentUserContext'

const CommentForm = (props) => {
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const { page, setComments } = props

  CommentForm.propTypes = {
    setComments: PropTypes.func,
    page: PropTypes.number
  }

  const currentUser = useCurrentUser()

  const handleChange = (e) => {
    setContent(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axiosRes.post('/comments/', {
        content,
        page
      })
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results]
      }))
      setContent('')
    } catch (err) {
      setErrors(err.response?.data)
    }
  }

  return (
    <Form className={styles.commentForm} onSubmit={handleSubmit}>
      <InputGroup className={styles.commentContainer}>
        <Image src={currentUser.profile_image ? currentUser.profile_image : defaultImage} className={styles.profilePicture} />
        <Form.Control
          placeholder="make a comment..."
          as="textarea"
          value={content}
          onChange={handleChange}
          rows={2}
        />
        <button

          type="submit">
          comment
        </button>
      </InputGroup>
      {errors.content?.map((message, idx) => (
        <p key={idx} className={styles.Form__Input_Warning}>
          {message}
        </p>
      ))}
    </Form>
  )
}

export default CommentForm
