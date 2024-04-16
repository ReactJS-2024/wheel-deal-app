import { Modal, Form, Button } from "react-bootstrap";
import AlertContext from "../../context/alertContext/AlertContext";
import { useContext, useState } from "react";

function ConfirmPassword({show, userEmail, onHide, onSubmit}) {

    const [password, setPassword] = useState('');
    const {showAlert} = useContext(AlertContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password) {
            onHide();
            setPassword('');
            return showAlert('You must provide your password!', 'danger');
        }
        setPassword('');
        onSubmit(password);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Reauthentication Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-2">
                    <Form.Label>Your current email</Form.Label>
                    <Form.Control
                        type="text"
                        value={userEmail}
                        disabled
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Please enter your password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Please enter your password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmPassword