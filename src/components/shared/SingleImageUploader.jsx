import { useContext, useEffect, useRef, useState } from "react";
import AlertContext from "../../context/alertContext/AlertContext";
import ProfileContext from "../../context/profileContext/ProfileContext";
import { Card, Col, Dropdown, Image } from "react-bootstrap";
import { TbPhotoUp } from "react-icons/tb";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { ref } from "firebase/storage";
import { storage } from "../../fbConfig";
import { removeSingleImage, uploadSingleImage } from "../../context/fileContext/fileActions";
import ActionTypes from "../../context/profileContext/profileActionTypes";
import './shared.css';

function SingleImageUploader({data, collection, objectName}) {

    const inputFileRef = useRef(null);
    const {showAlert} = useContext(AlertContext);
    const {user, dispatch} = useContext(ProfileContext);
    const [img, setImg] = useState(data?.photoUrl);

    const triggerFileInput = () => {
        inputFileRef.current.click();
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        let imgUrl;
        const imgRef = ref(storage, `${collection}/${Date.now()} - ${file.name}`); // profile/datum_trenutni - moja profila slika.png
        
        switch (objectName) {
            case 'users':
                imgUrl = await uploadSingleImage(imgRef, file, objectName, data?.uid);
                setImg(imgUrl);
                break;
            default:
                break;
        }

        dispatch({
            action: ActionTypes.SET_USER_DATA,
            payload: {
                ...user,
                photoUrl: imgRef ? imgUrl : ''
            }
        });
        
        let alertMsg = imgRef ? 'Your file has been successfully uploaded!' : 'Something went wrong, please try again';
        let alertType = imgRef ? 'success' : 'danger';
       
        showAlert(alertMsg, alertType);

    }

    const handleImageRemove = async () => {
        let isRemoval = window.confirm('Please confirm file removal');
        if (!isRemoval) {
            return;
        }
        let isRemoved = false;
        switch (objectName) {
            case 'users':
                isRemoved = await removeSingleImage(objectName, data.uid);
                break;
            default:
                break;
        }
        if (!isRemoved) {
            showAlert('Something went wrong while deleting your file, please try again', 'danger');
        }
        showAlert('Your file has been removed successfully.');
        dispatch({
            action: ActionTypes.SET_USER_DATA,
            payload: {
                ...user,
                photoUrl: ''
            }
        });
        setImg(null);
    }

    useEffect(() => {
        setImg(data.photoUrl);
    }, [user]);

    return (
       <>
            <Card className="custom-card mb-3">
                {
                   img ? 
                    <Col xs={6} md={4}>
                        <Image className='custom-image' alt={data.uid} src={img} />
                    </Col>
                    :
                    <TbPhotoUp size={150} className="py-2"/>
                }
            </Card>
            <Dropdown className='mt-1'>
                <Dropdown.Toggle variant="info" id="photo-dropdown-actions">
                    Profile Image
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className="custom-dp-item" onClick={triggerFileInput}>
                        <label className="custom-dp-item">
                            <MdOutlineFileUpload className="custom-dp-item" size={20} /> Upload new Image
                        </label>
                    </Dropdown.Item>
                    <input 
                        type="file"
                        id="image"
                        ref={inputFileRef}
                        accept="image/*"
                        style={{display: 'none'}}
                        onChange={handleImageUpload}
                    />
                    {
                        img &&  
                            <Dropdown.Item onClick={handleImageRemove}>
                                <label className="custom-dp-item">
                                    <MdOutlineDeleteForever size={20} /> Remove Image
                                </label>
                            </Dropdown.Item>
                    }   
                </Dropdown.Menu>
            </Dropdown>
       </>
    );
}

export default SingleImageUploader