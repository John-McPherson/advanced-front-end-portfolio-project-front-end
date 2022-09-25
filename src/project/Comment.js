import React, { useState, useEffect } from 'react'
import { Col, Row, Image, InputGroup } from 'react-bootstrap'
import defaultImage from "../assets/images/default-profile.svg"
import { axiosReq } from "../api/axiosDefaults"
import styles from "../assets/css/Comment.module.css"


const Comment = (props) => {


    const { content, author, timestamp, owner } = props;
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: user }] = await Promise.all([
                    axiosReq.get(`/profiles/${author}`),

                ]);
                setUserData({
                    user: user
                })
                console.log(user)
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();

    }, []);

    const [userData, setUserData] = useState({
        user: []

    });
    return (

        <div className={styles.commentForm} xs={12}>
            <div className={styles.commentContainer}>
                <Image src={userData.user.image} className={styles.profilePicture} />
                <h2 className={styles.userName}>{owner}</h2>
                <p className={styles.content}>{content}</p>
                <p className={styles.timeStamp}>{timestamp}</p>
            </div>
        </div>

    )
}

export default Comment