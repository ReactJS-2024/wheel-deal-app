import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { logoutUser } from '../context/authContext/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/authContext/AuthContext';
import ActionTypes from '../context/authContext/authActionTypes';
import { Button } from 'react-bootstrap';
import AlertContext from '../context/alertContext/AlertContext';

function CustomNavbar() {

  const navigate = useNavigate();
  const {dispatch, isAuthenticated} = useContext(AuthContext);
  const [showOffNavbar, setShowOffNavbar] = useState(false);
  const {showAlert} = useContext(AlertContext);

  const onLogout = async () => {
    const logoutResponse = await logoutUser();
    if (logoutResponse) {
      dispatch({
        type: ActionTypes.LOGOUT_SUCCESS
      });
      showAlert('You have successully logged out.');
      navigate('/auth/register');
    } else {
      dispatch({
        type: ActionTypes.LOGOUT_ERROR
      });
      showAlert('Oops something went wront while logging you out, please try again.', 'danger');
    }
    setShowOffNavbar(false);
  }

  return (
    <>
        <Navbar expand={false} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand as={Link} to='/'>Wheel Deal Inc.</Navbar.Brand>
            <Navbar.Toggle 
              aria-controls={`offcanvasNavbar-expand-${false}`} 
              onClick={() => setShowOffNavbar(true)}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${false}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
              placement="end"
              show={showOffNavbar}
              onHide={() => setShowOffNavbar(false)}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to='/' onClick={() => setShowOffNavbar(false)}>Home</Nav.Link>
                  <Nav.Link href="#action2" onClick={() => setShowOffNavbar(false)}>Ads</Nav.Link>
                  <NavDropdown
                    title="User actions"
                    id={`offcanvasNavbarDropdown-expand-${false}`}>
                    {
                      !isAuthenticated ?
                      <>
                        <NavDropdown.Item as={Link} onClick={() => setShowOffNavbar(false)}>
                          <Button variant='outline-none'>Login</Button>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to={'/auth/register'} onClick={() => setShowOffNavbar(false)}>
                          <Button variant='outline-none'>Register</Button>
                        </NavDropdown.Item>
                      </>
                      :
                      <NavDropdown.Item>
                        <Button variant='outline-none' onClick={onLogout}>Logout</Button>
                      </NavDropdown.Item>
                    }
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default CustomNavbar;