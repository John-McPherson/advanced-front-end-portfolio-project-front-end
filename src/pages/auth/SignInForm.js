import React, { useState } from "react";
import styles from "../../assets/css/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const SignUpForm = () => {
    const setCurrentUser = useSetCurrentUser();

    const [signInData, setsignInData] = useState({
        username: '',
        password: '',

    });

    const { username,
        password,
    } = signInData;

    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (e) => {
        setsignInData({
            ...signInData,
            [e.target.name]: e.target.value,
        });


    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user)
            history.push("/");
        } catch (err) {
   
            setErrors(err.response?.data);

        }
    }




    return (
        <Form onSubmit={handleSubmit}>
            <Row className={`${styles.Form__Container} ${styles.Form__Container__Signin}`} >

                <Col className={` ${styles.Form__Container__Col}`}  >
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

                        <Form.Group controlId="password" className={styles.Form__Input_Group}>
                            <span><i className="fa-solid fa-lock"></i></span>
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control type="password" name='password' placeholder="password" value={password} onChange={handleChange} />
                        </Form.Group>
                        {errors.password?.map((message, idx) => (
                            <p key={idx} className={styles.Form__Input_Warning}>
                                {message}
                            </p>
                        ))}




                        <Button type="submit" className={appStyles.Btn}>
                            sign up
                        </Button>


                    </Container>

                </Col>

            </Row >
        </Form >
    );
};

export default SignUpForm;