import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
  return (
    <Container className='mt-5 custom-container'>
         <h3 className='text-center'>Create your Account</h3>
         <p className='text-center text-danger'>Error placeholder</p>
         <Row className="justify-content-md-center">
           <Col md={6}>
             <Form className='shadow rounded p-3 m-3'>
               <Form.Group className="mb-3" controlId="formFirstName">
                 <Form.Label>First Name</Form.Label>
                 <Form.Control type="text" placeholder="Enter first name" name='firstName' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formLastName">
                 <Form.Label>Last Name</Form.Label>
                 <Form.Control type="text" placeholder="Enter last name" name='lastName' />
               </Form.Group>


               <Form.Group className="mb-3" controlId="formEmail">
                 <Form.Label>Email address</Form.Label>
                 <Form.Control type="email" placeholder="Enter email" name='email' />
                 <Form.Text className="text-muted">
                   We'll never share your email with anyone else.
                 </Form.Text>
               </Form.Group>
    
               <Form.Group className="mb-3" controlId="formPassword">
                 <Form.Label>Password</Form.Label>
                 <Form.Control type="password" placeholder="Password" name='password' />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formConfirmPassword">
                 <Form.Label>Confirm Password</Form.Label>
                 <Form.Control type="password" placeholder="Confirm Password" name='confirmPassword' />
               </Form.Group>


               <Form.Group className="mb-3" controlId="formBasicCheckbox">
                 <Form.Check type="checkbox" label="I accept terms & conditions." name='isConfirmed' />
               </Form.Group>
               <Button disabled={false} variant="primary" type="submit">
                 Create Account
               </Button>
             </Form>
           </Col>
         </Row>
       </Container>
  );
}

export default Register;