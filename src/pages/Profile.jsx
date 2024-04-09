import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProfileContext from "../context/profileContext/ProfileContext";
import { fetchUser } from "../context/profileContext/profileActions";
import ActionTypes from "../context/profileContext/profileActionTypes";
import { Col, Container, Row } from "react-bootstrap";
import BasicData from "../components/profile/BasicData";


function Profile() {

    const {id} = useParams();
    const {user, dispatch} = useContext(ProfileContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getUserData = async () => {
        setLoading(true);
        const userData = await fetchUser(id);
        let errorMsg = userData ? '' : 'No data about required user has been found.';
        
        dispatch({
            type: ActionTypes.SET_USER_DATA,
            payload: userData || null
        });
        setError(errorMsg);
        setLoading(false);
    }

    useEffect(() => {
        getUserData();
    }, [id]);

    if (loading) {
        return <h1 className="text-center text-info mt-5">Data is loading...</h1>
    }

    return (
        <div>
            {
                user ?
                    <Container className="py-4 custom-profile-wrapper">
                        <Row>
                            <Col xs={12} md={8}>
                                <BasicData user={user} />
                            </Col>
                            <Col xs={12} md={4}>
                                <p>Image Uploader placeholder</p>
                            </Col>
                        </Row>
                    </Container>
                : 
                    <h1 className="text-center mt-5 text-danger">{error}</h1>
            }
        </div>
    )
}

export default Profile