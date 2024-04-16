import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createAd } from "../../context/adContext/adActions";
import AlertContext from "../../context/alertContext/AlertContext";

function UpsertAdModal({show, handleClose}) {

    const {showAlert} = useContext(AlertContext);
    const [values, setValues] = useState({
        title: '',
        vType: 'Car',
        description: '',
        price: '',
        location: '',
        contact: '',
        error: '',
        loading: false
    });
    let {title, vType, description, price, location, contact, error, loading} = values;
    let [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO otkomentarisati sledeci cas
        // if (!images.length) {
        //     setValues({...values, error: 'At least 1 image of your ad must be provided.'});
        //     return;
        // }

        if (!title || !description || !price || !location || !contact) {
            setValues({...values, error: 'All fields are mandatory.'});
            return;
        }

        if (price <= 0) {
            setValues({...values, error: 'Please provide a price for your ad.'});
            return;
        }

        try {
            
            setValues({...values, loading: true});

            // const imgs = await uploadMultipleImages(images, 'ads');
            const imgs = []; // TODO skloniti naredni cas

            const isAdCreated = await createAd({
                title,
                vType,
                description,
                contact,
                price,
                location,
                imgs
            });

            if (isAdCreated) {
                showAlert('Your ad has been created!');
            } else {
                showAlert('Oops! Something went wrong, please try again!', 'danger');
            }
            setValues({...values, loading: false});
            handleClose();

        } catch (err) {
            setValues({...values, error: err.message, loading: false});
        }

    }

    const handleOnChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Please fill vehicle data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {/* <MultipleImagesUploader onImagesUpload={handleImagesUpload} isDialogOpened={show}/> */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control required onChange={handleOnChange} id="title" name='title' placeholder="Enter vehicle title" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="vType">Vehicle type</Form.Label>
                    <Form.Select required onChange={handleOnChange} name='vType' id="vType">
                        <option>Car</option>
                        <option>Motorcycle</option>
                        <option>Bike</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control required onChange={handleOnChange} as="textarea" rows={7} id="description" name='description' placeholder="Enter vehicle description" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="location">Location</Form.Label>
                    <Form.Control required onChange={handleOnChange} id="location" name='location' placeholder="Enter vehicle location" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="contact">Contact number</Form.Label>
                    <Form.Control required onChange={handleOnChange} id="contact" name='contact' placeholder="Enter contact number" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Form.Control type='text' required onChange={handleOnChange} value={price} id="price" name='price' placeholder="Enter your price in €" />
                </Form.Group>
                <p className='text-danger text-center'>{error}</p>
                <Button variant="secondary" onClick={handleClose} >
                    Close
                </Button>
                <Button className='ml-1' disabled={loading} variant="primary" type="submit">
                    Create ad
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpsertAdModal