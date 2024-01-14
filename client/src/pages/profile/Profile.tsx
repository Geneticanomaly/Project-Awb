import {useCookies} from 'react-cookie';
import {getUser} from '../../api/getUser';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Profile.css';
import {FaFileUpload} from 'react-icons/fa';
import AddImageModal from '../../components/addImageModal/AddImageModal';
import {ProfileImage, User} from '../../../typings';
import Navbar from '../../components/navbar/Navbar';
import {useNavigate} from 'react-router-dom';
import {getUserImages} from '../../api/getUserImages';

function Profile() {
    const [user, setUser] = useState<User>();
    const [images, setImages] = useState<ProfileImage[]>([]);
    const [cookies] = useCookies(['UserId', 'AuthToken']);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Access the userId parameter from the URL
    const {userId} = useParams<{userId: string}>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // If AuthToken does not exist or is undefined, restrict access
                if (cookies.AuthToken === 'undefined' || !cookies.AuthToken) {
                    navigate('/');
                    return;
                }

                const [userData, userImages] = await Promise.all([
                    getUser(userId),
                    getUserImages(userId),
                ]);

                setUser(userData);
                setImages(userImages);
            } catch (error) {
                console.error('Error fetching Profile data:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        // Run the fetchData only when showModal is false
        if (!showModal) {
            fetchData();
        }
    }, [userId, showModal, cookies.AuthToken, navigate]);

    // Render loading indicator or return null for TinderCard components during loading
    if (loading) {
        // If AuthToken does not exist or is undefined restrict access
        if (cookies.AuthToken === 'undefined' || !cookies.AuthToken) {
            navigate('/');
        }
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar isInProfilePage={true} userId={userId} />
            <div className="profile-page-container">
                <div className="profile-info-container" data-testid="profile-info-container">
                    <img
                        src={`data:${user?.url?.mimetype};base64,${user?.url?.buffer?.toString()}`}
                    />
                    <div className="profile-info">
                        <h2>Registered: {user?.registration_date.split('T')[0]}</h2>
                        <h2>{user?.email}</h2>
                        <h2>{user?.first_name + ' ' + user?.last_name}</h2>
                    </div>
                </div>

                {user?.user_id === cookies.UserId && (
                    <button
                        className="profile-add-image"
                        onClick={() => setShowModal(true)}
                        data-testid="profile-add-image"
                    >
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
                {images && images.length > 0 ? (
                    <section className="images-container">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={`data:${image.mimetype};base64,${image.buffer?.toString()}`}
                                alt={`Image ${index}`}
                            />
                        ))}
                    </section>
                ) : (
                    <p className="image-msg">This profile has no images...</p>
                )}
                {showModal && <AddImageModal userId={user?.user_id} setShowModal={setShowModal} />}
            </div>
        </>
    );
}

export default Profile;
