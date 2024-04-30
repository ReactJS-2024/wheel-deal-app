import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createAd, getAllAds, updateAd } from "../../context/adContext/adActions";
import AlertContext from "../../context/alertContext/AlertContext";
import MultipleImagesUploader from "../shared/MultipleImagesUploader";
import { uploadMultipleImages } from "../../context/fileContext/fileActions";
import { formatPrice } from "../../utils/priceUtils";
import './ads.css';

function UpsertAdModal({show, handleClose, isUpdateModal, adData}) {

    const [isNewImagesUploaded, setIsNewImagesUploaded] = useState(false);
    const {showAlert} = useContext(AlertContext);
    const [values, setValues] = useState({
        title: !isUpdateModal ? '' : adData.title,
        vType: !isUpdateModal ? 'Car' : adData.type.charAt(0).toUpperCase() + adData.type.slice(1),
        description: !isUpdateModal ? '' : adData.description,
        price: !isUpdateModal ? '' : adData.price,
        location: !isUpdateModal ? '' : adData.location,
        contact: !isUpdateModal ? '' : adData.contact,
        error: '',
        loading: false
    });
    let {title, vType, description, price, location, contact, error, loading} = values;
    const [images, setImages] = useState(adData ? adData.images : []);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            let isAdUpserted;
            let uploadedImages = images;

            if (isNewImagesUploaded) {
                uploadedImages = await uploadMultipleImages(images);
            }
            
            if (!uploadedImages?.length) {
                setValues({...values, error: 'At least 1 image of your ad must be provided.'});
                return;
            }

            if (!isUpdateModal) {
                isAdUpserted = await createAd({
                    title,
                    vType,
                    description,
                    contact,
                    price,
                    location,
                    imgs: uploadedImages
                });
            } else {
                const docForUpdate = {
                    title,
                    vType,
                    description,
                    contact,
                    price,
                    location,
                    imgs: isNewImagesUploaded ? uploadedImages : []
                }
                isAdUpserted = await updateAd(adData.id, docForUpdate);
            }

            if (isAdUpserted) {
                showAlert(`Your ad has been ${isUpdateModal ? 'updated' : 'created'} successfully`);
            } else {
                showAlert('Oops! Something went wrong, please try again!', 'danger');
            }
            
            if (isUpdateModal) {
                setValues({...values, loading: false});
            } else {
                setValues({...values, title: '', description: '', price: '', contact: '', vType: 'Car', location: '', loading: false});
            }
            setIsNewImagesUploaded(false);
            handleClose();

        } catch (err) {
            setValues({...values, error: err.message, loading: false});
        }

    }

    const handleImagesUpload = (newImages) => {
        setImages(newImages);
        setIsNewImagesUploaded(true);
    };

    const handleImagesRemove = () => {
        setImages([]);
    }

    const handleOnChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
        if (e.target.name === 'price') {
            setValues({...values, price: formatPrice(e.target.value)});
        } else {
            setValues({...values, [e.target.name]: e.target.value});
        }
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
            <MultipleImagesUploader 
                onImagesUpload={handleImagesUpload} 
                isDialogOpened={show}
                inputImages={adData?.images.map(img => img.url)}
                onImagesRemove={handleImagesRemove}
            />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control value={title} required onChange={handleOnChange} id="title" name='title' placeholder="Enter vehicle title" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="vType">Vehicle type</Form.Label>
                    <Form.Select required onChange={handleOnChange} name='vType' id="vType" value={vType}>
                        <option>Car</option>
                        <option>Motorcycle</option>
                        <option>Bike</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control value={description} required onChange={handleOnChange} as="textarea" rows={7} id="description" name='description' placeholder="Enter vehicle description" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="location">Location</Form.Label>
                    <Form.Control value={location} required onChange={handleOnChange} id="location" name='location' placeholder="Enter vehicle location" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="contact">Contact number</Form.Label>
                    <Form.Control value={contact} required onChange={handleOnChange} id="contact" name='contact' placeholder="Enter contact number" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Form.Control type='text' required onChange={handleOnChange} value={price} id="price" name='price' placeholder="Enter your price in €" />
                </Form.Group>
                <p className='text-danger text-center'>{error}</p>
                <Button variant="secondary" onClick={handleClose} >
                    Close
                </Button>
                <Button className='custom-button' disabled={loading} variant="primary" type="submit">
                    {isUpdateModal ? 'Updated Ad' : 'Create Ad'}
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpsertAdModal