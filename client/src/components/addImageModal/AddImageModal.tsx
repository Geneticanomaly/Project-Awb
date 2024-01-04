import './AddImageModal.css';
import {useState} from 'react';

type AddImageModalProps = {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddImageModal({setShowModal}: AddImageModalProps) {
    const [image, setImage] = useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imageUrl = URL.createObjectURL(e.target.files?.[0]);
            setImage(imageUrl);
        }
    };

    return (
        <div className="image-modal">
            <button className="image-close-icon" onClick={() => setShowModal(false)}>
                ⓧ
            </button>
            Add Images to your profile
            <div className="image-modal-container">
                <input
                    type="file"
                    className="custom-file-input"
                    onChange={(e) => handleChange(e)}
                />
                <button className="upload-image" onClick={() => setShowModal(false)}>
                    Upload image
                </button>
                <img src={image} alt="Image preview" />
            </div>
        </div>
    );
}

export default AddImageModal;
