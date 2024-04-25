import { Button } from "react-bootstrap"
import UpsertAdModal from "./UpsertAdModal"
import { useState } from "react"


function NewAd() {

    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div className="text-center custom-ad-wrapper">
            <Button className="btn btn-success" onClick={handleOpen}>
                Create Ad
            </Button>
            <UpsertAdModal 
                show={showModal}
                handleClose={handleClose}
            />
        </div>
    )
}

export default NewAd