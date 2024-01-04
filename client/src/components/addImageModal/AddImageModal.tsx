import {addImage} from '../../api/addImage';
import './AddImageModal.css';
import {useEffect, useState} from 'react';

type AddImageModalProps = {
    userId: string | undefined;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddImageModal({userId, setShowModal}: AddImageModalProps) {
    const [file, setFile] = useState<File | null>();
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setImageUrl(URL.createObjectURL(selectedFile));
            setFile(selectedFile);
        }
    };

    useEffect(() => {
        console.log('Updated File:', file);
    }, [file]);

    const uploadUserImage = async () => {
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
            console.log('FormData:', formData);
            const response = await addImage(userId, formData);
            console.log('Response:', response);
        }
        setShowModal(false);
    };

    return (
        <>
            <div className="image-modal-background" onClick={() => setShowModal(false)}></div>
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
                    <button className="upload-image" onClick={uploadUserImage}>
                        Upload image
                    </button>
                    <img src={imageUrl} alt="Image preview" />
                </div>
            </div>
        </>
    );
}

export default AddImageModal;
