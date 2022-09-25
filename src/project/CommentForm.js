import React, { useState } from 'react'
import { Form, Image, InputGroup } from 'react-bootstrap'
import defaultImage from "../assets/images/default-profile.svg"
import { axiosRes } from "../api/axiosDefaults"
import styles from "../assets/css/Comment.module.css"


const CommentForm = (props) => {
    const [content, setContent] = useState("")

    const { page, setComments } = props;

    const handleChange = (e) => {
        setContent(e.target.value)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(page)
        try {
            const { data } = await axiosRes.post("/comments/", {
                content,
                page,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setContent("");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Form className={styles.commentForm} onSubmit={handleSubmit}>
            <InputGroup className={styles.commentContainer}>
                <Image src={defaultImage} className={styles.profilePicture} />
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
        </Form>
    )
}

export default CommentForm