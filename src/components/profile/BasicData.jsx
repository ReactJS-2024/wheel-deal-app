import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import NoDataMsg from "../shared/NoDataMsg";
import { convertFBTimestampToDate } from "../../utils/dateUtils";
import { updateUserData } from "../../context/profileContext/profileActions";
import AlertContext from "../../context/alertContext/AlertContext";
import ProfileContext from "../../context/profileContext/ProfileContext";
import ActionTypes from "../../context/profileContext/profileActionTypes";


function BasicData({user}) {

    const {dispatch} = useContext(ProfileContext);
    const [editMode, setEditMode] = useState(false);
    const {showAlert} = useContext(AlertContext);
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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let updatedUser;
        const updatedFirstName = firstName || user.firstName;
        const updatedLastName = lastName || user.lastName;
        const updatedUserName = userName || user.userName;
        const updatedEmail = email || user.email;
        let isUpdateConfirmed = window.confirm('Please confirm saving data');
        if (!isUpdateConfirmed) {
            return;
        }

        updatedUser = await updateUserData(user, {
            firstName: updatedFirstName,
            lastName: updatedLastName, 
            userName: updatedUserName,
            email: updatedEmail
        });

        let alertMsg = !updatedUser 
            ? 'Something went wrong while updating your profile data, please try again.' 
            : 'Your profile data has been updated successfully';
        let alertType = !updatedUser
            ? 'danger'
            : 'success';
            
        showAlert(alertMsg, alertType);
        dispatch({
            type: ActionTypes.SET_USER_DATA,
            payload: !updatedUser ? user : updatedUser
        });

        setEditMode(false);
    }

    if (!user || Object.keys(user).length === 0) {
        return <NoDataMsg messageText='No Data found...' />
    }

    return (
        <>
            <h2>Hello {user.firstName} {user.lastName} (<span style={{fontStyle: 'italic'}}>{user.userName}</span>), you joined us on 
                <span className="text-info"> {convertFBTimestampToDate(user.createdAt)}</span>
            </h2>
            <hr />
            <Form onSubmit={handleFormSubmit}>
                <p className="text-center text-danger">{error}</p>
                <Form.Group className="mb-3" controlId="formSwitch">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={editMode}
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