import { useContext, useState } from "react";
import AlertContext from "../context/alertContext/AlertContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { sendForgotPasswordEmail } from "../context/authContext/authActions";
import './pages.css';

function ForgotPassword() {

    const {showAlert} = useContext(AlertContext);
    const [values, setValues] = useState({
        email: '',
        error: '',
        loading: false
    });

    let {email, error, loading} = values;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setValues({
                ...values,
                error: 'Please provide valid email address'
            });
            return;
        }
        setValues({
            ...values,
            loading: true,
            error: ''
        });
        const sendEmailResult = await sendForgotPasswordEmail(email);
        if (sendEmailResult) {
            showAlert(`Password reset link has been sent to following email addres: ${email}`);
            setValues({
                ...values,
                loading: false,
                email: ''
            });
        } else {
            showAlert('Oops, something went wrong while sending you a reset password link.');
            setValues({
                ...values,
                loading: false
            }); 
        }
    } 

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Container className="mt-5 custom-wrapper">
            <h3 className="text-center">Forgot your password?</h3>
            <p className="text-center text-danger">{error}</p>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Form className="shadow rounded p-3 m-3" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                value={email} 
                                type="email" 
                                placeholder="Enter email" 
                                name='email' 
                                onChange={handleChange}/>
                            <Form.Text className="text-muted">
                                Enter email to which your reset password link will be sent
                            </Form.Text>
                        </Form.Group>
                        <Button disabled={loading} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgotPassword