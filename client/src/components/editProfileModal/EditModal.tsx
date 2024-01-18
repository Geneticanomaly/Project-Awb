import {useState} from 'react';
import './EditModal.css';
import {User} from '../../../typings';
import {editProfileInfo} from '../../api/editProfileInfo';

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
        // Set the formData state.
        // By acquiring the previous state and only editing a specific target by name
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Call a PUT request for editing user profile
        await editProfileInfo(
            user?.user_id,
            formData.first_name,
            formData.last_name,
            formData.about
        );
        // Close the modal
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
                        required={true}
                    />
                    <label htmlFor="last_name">Last name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        placeholder="Last name"
                        onChange={(e) => handleChange(e)}
                        required={true}
                    />
                    <label htmlFor="about">About</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        rows={8}
                        placeholder="Tell about yourself..."
                        onChange={(e) => handleChange(e)}
                        required={true}
                    ></textarea>
                    <input type="submit" value={'Save Changes'} />
                </form>
            </div>
        </>
    );
}

export default EditModal;
