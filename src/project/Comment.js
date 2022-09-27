import React, { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap'

import { axiosReq } from "../api/axiosDefaults"
import styles from "../assets/css/Comment.module.css"


const Comment = (props) => {


    const { content, author, timestamp } = props;
    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: user }] = await Promise.all([
                    axiosReq.get(`/profiles/${author}`),

                ]);
                setUserData({
                    user: user
                })

            } catch (err) {
         
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
                <div className={styles.commentContainer__comment}>
                    <h2 className={styles.userName}>{userData.user.name}</h2>
                    <p className={styles.content}>{content}</p>
                    <p className={styles.timeStamp}>{timestamp}</p>
                </div>
            </div>
        </div>

    )
}

export default Comment