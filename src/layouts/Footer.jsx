import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaLinkedin, FaPinterestP, FaFacebookF } from 'react-icons/fa';

function CustomFooter() {
    return (
        <footer className="footer mt-auto py-3 bg-light custom-footer position-fixed bottom-0 w-100">
            <Container>
                <Row>
                    <Col md={4} sm={12}>
                        <h5>Wheel Deal Inc.</h5>
                        <p className="text-muted">Your trusted partner for buying and selling vehicles.</p>
                    </Col>
                    <Col md={4} sm={12}>
                        <p className="text-center text-muted">© 2024 Wheel Deal, Inc</p>
                    </Col>
                    <Col md={4} sm={12} className="text-center">
                        <h5>Follow Us</h5>
                        <a href="https://instagram.com" className="text-secondary mx-1"><FaInstagram size={25} /></a>
                        <a href="https://linkedin.com" className="text-secondary mx-1"><FaLinkedin size={25} /></a>
                        <a href="https://pinterest.com" className="text-secondary mx-1"><FaPinterestP size={25} /></a>
                        <a href="https://facebook.com" className="text-secondary mx-1"><FaFacebookF size={25} /></a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default CustomFooter;