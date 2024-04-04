import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../context/authContext/authActions';
import ActionTypes from '../context/authContext/authActionTypes';
import AuthContext from '../context/authContext/AuthContext';
import './pages.css';
import AlertContext from '../context/alertContext/AlertContext';

function Login() {
    const {dispatch} = useContext(AuthContext);
    const {showAlert} = useContext(AlertContext);
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false
    });
    const {email, password, error, loading} = values;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setValues({...values, error: 'Please fill in all required fields'});
            return;
        }
        setValues({...values, loading: true, error: ''});
        const result = await loginUser({email, password});
        if (result) {
            dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                payload: result.user
            });
            setValues({
                email: '',
                password: '',
                error: ''
            });
            showAlert('You have successfully logged in.');
            navigate('/');
        } else {
            dispatch({
                type: ActionTypes.LOGIN_ERROR
            });
            showAlert('Please check your email and password and try to log in again.', 'danger');
        }
        setValues({...values, loading: false});
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <Container className='mt-5 custom-wrapper'>
            <h3 className='text-center'>Login</h3>
            <p className='text-center text-danger'>{error}</p>
            <Row className="justify-content-md-center">
                <Col md={6}>
                <Form className='shadow rounded p-3 m-3' onSubmit={handleSubmit}> 

                    <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formForgotPassword">
                        <Form.Label as={Link} to={'/auth/forgot-password'}>Forgot your password?</Form.Label>
                    </Form.Group>

                    <Button disabled={loading} variant="primary" type="submit">
                    Login
                    </Button> 
                </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login