import { useState } from "react";
import { Button, Form } from "react-bootstrap";


function BasicData({user}) {

    const [formDisabled, setFormDisabled] = useState(false);
    const [values, setValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
        error: ''
    });

    const {email, firstName, lastName, userName, error} = values;

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    console.log(user)
    if (!user || Object.keys(user).length === 0) {
        return <h1 className="text-center mt-5 text-info">Basic Data is loading...</h1>
    }

    return (
        <>
            <h2>Hello {user.firstName} {user.lastName} ({user.userName}), you joined us on <span>date_placeholder</span></h2>
            <hr />
            <Form onSubmit={handleFormSubmit}>
                <p className="text-center text-danger">{error}</p>
                <Form.Group className="mb-3" controlId="formSwitch">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label='Turn on to edit your profile data'
                        onChange={() => setFormDisabled(prevState => !prevState)}>
                    </Form.Check>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                        First Name
                    </Form.Label>
                    <Form.Control
                        name="firstName"
                        onChange={handleChange}
                        disabled={formDisabled}
                        type="text"
                        placeholder={user.firstName}
                        value={formDisabled ? user.firstName : firstName}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                        Last Name
                    </Form.Label>
                    <Form.Control
                        name="lastName"
                        onChange={handleChange}
                        disabled={formDisabled}
                        type="text"
                        placeholder={user.lastName}
                        value={formDisabled ? user.lastName : lastName}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                        User Name
                    </Form.Label>
                    <Form.Control
                        name="userName"
                        onChange={handleChange}
                        disabled={formDisabled}
                        type="text"
                        placeholder={user.userName}
                        value={formDisabled ? user.userName : userName}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        name="email"
                        onChange={handleChange}
                        disabled={formDisabled}
                        type="text"
                        placeholder={user.email}
                        value={formDisabled ? user.email : email}>
                    </Form.Control>
                </Form.Group>

                <Button disabled={formDisabled} className="mb-3 btn btn-primary">
                    Modify data
                </Button>
            </Form>
        </>
    )
}

export default BasicData