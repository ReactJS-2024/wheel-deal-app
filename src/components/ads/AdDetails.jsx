import { Container, Modal, Row, Col, Carousel, Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { formatPrice } from "../../utils/priceUtils"
import { Link } from "react-router-dom";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';
import { useCallback, useState } from "react";
import './ads.css';

function AdDetails({show, handleClose, adData}) {

    const [showZoomModal, setShowZoomModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [isZoomed, setIsZoomed] = useState(false)

    const handleZoomChange = useCallback(shouldZoom => {
      setIsZoomed(shouldZoom)
    }, []);

    const handleShowZoomModal = (imageUrl) => {
        setShowZoomModal(true);
        setSelectedImage(imageUrl);
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Visit Profile
        </Tooltip>
    );

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ad Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col md={8} xs={12}>
                                    {
                                        adData.user &&
                                            <OverlayTrigger
                                                placement="right"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip}>
                                                    <h5 className="text-success">
                                                        Ad created by: 
                                                            <Link 
                                                                className="text-success"
                                                                style={{textDecoration: 'none'}} 
                                                                to={`/profile/${adData.user.uid}`}>
                                                                    {' '} {adData.user.userName}
                                                            </Link>
                                                    </h5>
                                            </OverlayTrigger>
                                    }
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col xs={12} md={8}>
                                    <h3>{adData.title}</h3>
                                </Col>
                                {/* Nije potrebno */}
                                {/* <Col>
                                    <Image src={adData.user.photoUrl} thumbnail />
                                </Col> */}
                                <Col xs={6} md={4}>
                                    <h3 className="text-success">{formatPrice(adData.price)} €</h3>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Carousel>
                                    {adData.images.map((image, index) => (
                                        <Carousel.Item className="custom-carousel-item" key={index} onClick={() => handleShowZoomModal(image.url)}>
                                            <img
                                                className="carousel-image w-100"
                                                src={image.url}
                                                alt={`Slide ${index}`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Row>
                            <Row className="mt-3">
                                <p>
                                    {adData.description}
                                </p>
                            </Row>
                            <Row className="d-flex">
                                <h5>Contact the seller:</h5>
                                <a className="text-success text-decoration-none" href={`tel:${adData.contact}`}>
                                    {adData.contact}
                                </a>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
            </Modal>
            <Modal centered show={showZoomModal} onHide={() => {setShowZoomModal(false)}}>
                <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                    <img
                        alt={selectedImage}
                        src={selectedImage}
                        width="500"
                    />
                </ControlledZoom>
            </Modal>
        </>
    )
}

export default AdDetails