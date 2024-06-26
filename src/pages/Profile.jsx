import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProfileContext from "../context/profileContext/ProfileContext";
import { fetchUser } from "../context/profileContext/profileActions";
import ActionTypes from "../context/profileContext/profileActionTypes";
import { Col, Container, Row } from "react-bootstrap";
import BasicData from "../components/profile/BasicData";
import SingleImageUploader from "../components/shared/SingleImageUploader";
import AllAds from "../components/ads/AllAds";
import { auth } from "../fbConfig";
import AdFilters from "../components/ads/AdFilters";
import NewAd from "../components/ads/NewAd";
import CustomSpinner from "../components/shared/Spinner";


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
        return <CustomSpinner />
    }

    return (
        <div>
            {
                user ?
                    <Container className="py-4 custom-profile-wrapper">
                        <Row>
                            <Col xs={12} md={8}>
                                <BasicData
                                    user={user}
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <SingleImageUploader 
                                    data={user} 
                                    collection='profile' 
                                    objectName='users'
                                    loggedUserId={auth.currentUser.uid}
                                />
                            </Col>
                        </Row>
                        <h1 className="text-center my-5">Your ads</h1>
                        <div className="d-flex justify-content-evenly mb-4">
                            {
                                auth.currentUser.uid === user.uid &&
                                    <NewAd/>
                            }
                            <AdFilters isSoldFilterVisible={true} />
                        </div>
                        <hr className="w-50 mx-auto" />
                        <AllAds fetchUserAds={true} userId={id} />
                    </Container>
                : 
                    <h1 className="text-center mt-5 text-danger">{error}</h1>
            }
        </div>
    )
}

export default Profile