import { useEffect, useRef, useState } from "react";
import { Carousel, Button } from "react-bootstrap"
import { IoIosImages } from "react-icons/io";

function MultipleImagesUploader({onImagesUpload, isDialogOpened, inputImages}) {

    console.log(inputImages)
    let [images, setImages] = useState(inputImages?.length ? inputImages : []);
    const inputFileRef = useRef(null);

    const triggerFileInput = () => {
        inputFileRef.current.click();
    }

    const handleImagesUpload = (e) => {
        const files = e.target.files;
        const imagesUrl = [];

        if (!files) {
            return;
        }
        const filesArr = Array.from(files); // ! files je lista fajlova, i onda uz Array.from() od ove liste mi pravimo JS niz
        filesArr.forEach(file => {
            const imageUrl = URL.createObjectURL(file);
            imagesUrl.push(imageUrl);
        });
        setImages(imagesUrl);
        onImagesUpload(filesArr);
    }

    useEffect(() => {
        if (!isDialogOpened) {
            setImages([]);
        }
    }, [isDialogOpened]);

    return (
        <>
            {images.length ? 
                <>
                    <Carousel>
                        {images.map((url, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="carousel-image w-100"
                                    src={url}
                                    alt={`Img ${index+1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <Button className="btn mb-4 mt-1 btn-danger" onClick={() => setImages([])}>Remove images</Button>
                </>
            :
                <div className="mx-auto d-flex flex-column align-items-center mb-4">
                    <IoIosImages size={150}/>
                    <Button className="btn btn-success" onClick={triggerFileInput}>Upload images</Button>
                    <input 
                        max={3}
                        multiple
                        type="file"
                        id="image"
                        ref={inputFileRef}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImagesUpload}
                    />
                 </div>
            }
        </>
    )
}

export default MultipleImagesUploader