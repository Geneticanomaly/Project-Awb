import {useState} from 'react';
import './EditModal.css';
import {User} from '../../../typings';

type EditModalProps = {
    user: User | undefined;
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditModal({user, setShowEditModal}: EditModalProps) {
    const [formData, setFormData] = useState({
        first_name: user!.first_name,
        last_name: user!.last_name,
        about: user!.about,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        console.log(formData);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('I WAS HERE!');
        setShowEditModal(false);
    };

    return (
        <>
            <div className="modal-background" onClick={() => setShowEditModal(false)} />
            <div className="modal">
                <button className="modal-close-icon" onClick={() => setShowEditModal(false)}>
                    ⓧ
                </button>
                <h2>Edit your personal information</h2>
                <form className="edit-modal-form" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="first_name">First name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        placeholder="First name"
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="last_name">Last name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        placeholder="Last name"
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor="about">About</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        rows={8}
                        placeholder="Tell about yourself..."
                        onChange={(e) => handleChange(e)}
                    ></textarea>
                    <input type="submit" value={'Save Changes'} />
                </form>
            </div>
        </>
    );
}

export default EditModal;
