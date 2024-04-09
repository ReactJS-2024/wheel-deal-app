import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import NoDataMsg from "../shared/NoDataMsg";


function BasicData({user}) {

    const [editMode, setEditMode] = useState(false);
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
        console.log(e);
    }

    if (!user || Object.keys(user).length === 0) {
        return <NoDataMsg messageText='No Data found...' />
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
                        onChange={() => setEditMode(prevState => !prevState)}>
                    </Form.Check>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                        First Name
                    </Form.Label>
                    <Form.Control
                        name="firstName"
                        onChange={handleChange}
                        disabled={!editMode}
                        type="text"
                        placeholder={user.firstName}
                        value={editMode ? firstName : user.firstName}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                        Last Name
                    </Form.Label>
                    <Form.Control
                        name="lastName"
                        onChange={handleChange}
                        disabled={!editMode}
                        type="text"
                        placeholder={user.lastName}
                        value={editMode ? lastName : user.lastName}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                        User Name
                    </Form.Label>
                    <Form.Control
                        name="userName"
                        onChange={handleChange}
                        disabled={!editMode}
                        type="text"
                        placeholder={user.userName}
                        value={editMode ? userName : user.userName}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        name="email"
                        onChange={handleChange}
                        disabled={!editMode}
                        type="text"
                        placeholder={user.email}
                        value={editMode ? email : user.email}>
                    </Form.Control>
                </Form.Group>

                <Button disabled={!editMode} className="mb-3 btn btn-primary" type="submit">
                    Modify data
                </Button>
            </Form>
        </>
    )
}

export default BasicData