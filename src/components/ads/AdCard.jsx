import { Card, Button, Dropdown } from "react-bootstrap"
import { convertFBTimestampToDate } from "../../utils/dateUtils"
import { useState } from "react"
import './ads.css';
import AdDetails from "./AdDetails";


function AdCard({cardData, isEditEnabled}) {

    const [isShowDetails, setIsShowDetails] = useState(false);
    const handleShow = () => setIsShowDetails(true);
    const handleClose = () => setIsShowDetails(false);

    const onUpdateAd = () => {

    }

    const onDeleteAd = () => {

    }

    const onMarkedAsSold = () => {
        
    }
    
    return (
        <>
            <Card className={`mb-4 custom-card shadow ${cardData.isSold ? 'card-sold' : ''}`}>
                {cardData.isSold && <div className="sold-overlay">SOLD</div>}
                <Card.Img className="custom-card-img" variant="top" src={cardData.images[0].url} />
                <Card.Body>
                    <Card.Title>{cardData.title}</Card.Title>
                    <Card.Subtitle>{cardData.price} €</Card.Subtitle>
                    <Card.Text className="mt-1">
                        Published at <strong>{convertFBTimestampToDate(cardData.publishedAt)}</strong>
                    </Card.Text>
                    <div className="container d-flex justify-content-between">
                        <Button disabled={cardData.isSold} onClick={handleShow} variant="outline-primary">More details</Button>
                        {
                            isEditEnabled &&
                                <Dropdown className="mt-2">
                                    <Dropdown.Toggle variant="outline-primary" disabled={cardData.isSold}>
                                        Ad Actions
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => onUpdateAd()}>
                                            Edit Ad
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => onDeleteAd()}>
                                            Delete Ad
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => onMarkedAsSold()}>
                                            Mark as Sold
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                        }
                    </div>
                </Card.Body>
            </Card>
            <AdDetails adData={cardData} show={isShowDetails} handleClose={handleClose}/>
        </>
    )
}

export default AdCard