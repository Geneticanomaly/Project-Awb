import {useCookies} from 'react-cookie';
import {getUser} from '../../api/getUser';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Profile.css';
import {FaFileUpload} from 'react-icons/fa';
import AddImageModal from '../../components/addImageModal/AddImageModal';
import {User} from '../../../typings';

function Profile() {
    const [user, setUser] = useState<User>();
    const [cookies] = useCookies(['UserId', 'AuthToken']);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');

    // Access the userId parameter from the URL
    const {userId} = useParams<{userId: string}>();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUser(userId);
            setUser(response);
        };
        // Run the fetchUserData only when showModal is false
        if (!showModal) {
            fetchUserData();
            console.log('Fetch user data based on id!');
        }
    }, [userId, showModal]);

    console.log(user);

    return (
        <div className="profile-page-container">
            <div className="profile-info-container">
                <img src={user?.url} />
                <div className="profile-info">
                    <h2>Registered: {user?.registration_date.split('T')[0]}</h2>
                    <h2>{user?.email}</h2>
                    <h2>{user?.first_name + ' ' + user?.last_name}</h2>
                </div>
            </div>

            {user?.user_id === cookies.UserId && (
                <button className="profile-add-image" onClick={() => setShowModal(true)}>
                    <div className="img-btn-container">
                        <FaFileUpload className="file-upload-image" />
                        Add images
                    </div>
                </button>
            )}

            <div className="about">
                <h2>About me</h2>
                <p>{user?.about}</p>
            </div>
            <div className="line" />
            {user?.images?.length > 0 ? (
                <section className="images-container">
                    {user?.images?.map((image, index) => (
                        <img
                            key={index}
                            src={`data:image/jpeg;base64,${image.image}`}
                            alt={`Image ${index}`}
                        />
                    ))}
                </section>
            ) : (
                <p className="image-msg">This profile has no images...</p>
            )}
            {showModal && <AddImageModal userId={user?.user_id} setShowModal={setShowModal} />}
        </div>
    );
}

export default Profile;
