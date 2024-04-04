import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState, useContext} from 'react';
import { registerUser } from '../context/authContext/authActions';
import AuthContext from '../context/authContext/AuthContext';
import ActionTypes from '../context/authContext/authActionTypes';
import { useNavigate } from 'react-router-dom';

function Register() {

    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        isConfirmed: false,
        loading: false
    });

    const {firstName, lastName, userName, email, password, confirmPassword, isConfirmed, loading, error} = values;

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let regexPasswordPattern;
        if (!firstName || !lastName || !userName || !email || !password || !confirmPassword || isConfirmed === false) {
            setValues({
                ...values,
                error: 'Please fill in all the mandatory fields'
            });
            return;
        }
        if (password !== confirmPassword) {
            setValues({
                ...values,
                error: 'Passwords must match.'
            });
            return;
        }
        //Minimum eight characters, at least one letter and one number:
        regexPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regexPasswordPattern.test(password)) {
            setValues({
                ...values,
                error: 'Password must be at least of 8 characters, containing at least one letter and one number'
            });
            return;
        }
        setValues({
            ...values,
            error: '',
            loading: true
        });

        const formData = {
            firstName,
            lastName,
            userName,
            email,
            password
        }

        const user = await registerUser(formData);

        if (user) {
            dispatch({
                type: ActionTypes.REGISTER_SUCCESS,
                payload: user
            });
            setValues({
                firstName: '',
                lastName: '',
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
                error: '',
                isConfirmed: false
            });
            navigate('/');
        } else {
            dispatch({
                type: ActionTypes.REGISTER_ERROR
            });
        }
        setValues({...values, loading: false});
    }

    return (
        <Container className='mt-5 custom-container'>
            <h3 className='text-center'>Create your Account</h3>
            <p className='text-center text-danger'>{error}</p>
            <Row className="justify-content-md-center">
            <Col md={6}>
                <Form className='shadow rounded p-3 m-3' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            value={firstName} 
                            type="text" 
                            placeholder="Enter first name" 
                            name='firstName' 
                            onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            value={lastName} 
                            type="text" 
                            placeholder="Enter last name" 
                            name='lastName' 
                            onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control 
                            value={userName} 
                            type="text" 
                            placeholder="Enter user name" 
                            name='userName' 
                            onChange={handleChange}/>
                        <Form.Text className="text-muted">
                            Your username will be visible to other users.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            value={email} 
                            type="email" 
                            placeholder="Enter email" 
                            name='email' 
                            onChange={handleChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
            
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            value={password} 
                            type="password" 
                            placeholder="Password" 
                            name='password' 
                            onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            value={confirmPassword} 
                            type="password" 
                            placeholder="Confirm Password" 
                            name='confirmPassword' 
                            onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check 
                            value={isConfirmed} 
                            type="checkbox" 
                            label="I accept terms & conditions." 
                            name='isConfirmed'
                            onChange={handleChange} />
                    </Form.Group>

                    <Button disabled={loading} variant="primary" type="submit">
                        Create Account
                    </Button>
                </Form>
            </Col>
            </Row>
        </Container>
    );
}

export default Register;