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
import {calculateAge} from '../../helperFunctions';
import {TbEdit} from 'react-icons/tb';
import EditProfileModal from '../../components/editProfileModal/EditModal';

function Profile() {
    const [user, setUser] = useState<User>();
    const [images, setImages] = useState<ProfileImage[]>([]);
    const [age, setAge] = useState<string>('');
    const [cookies] = useCookies(['UserId', 'AuthToken']);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

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

                const currentAge = calculateAge(
                    parseInt(userData.dob_day),
                    parseInt(userData.dob_month),
                    parseInt(userData.dob_year)
                );
                setAge(currentAge.toString());
            } catch (error) {
                console.error('Error fetching Profile data:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        // Run the fetchData only when either modal is false
        if (!showModal && !showEditModal) {
            fetchData();
        }
    }, [userId, showModal, cookies.AuthToken, navigate, showEditModal]);

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
                    <img src={`data:${user?.url.mimetype};base64,${user?.url.buffer.toString()}`} />
                    <div className="profile-info">
                        <h2>Registered: {user?.registration_date.split('T')[0]}</h2>
                        <h2>{user?.email}</h2>
                        <h2>{user?.first_name + ' ' + user?.last_name}</h2>
                        <h2>{age} Years old</h2>
                    </div>
                </div>

                {user?.user_id === cookies.UserId && (
                    <section className="profile-functions">
                        <button
                            className="profile-btn-function"
                            onClick={() => setShowEditModal(true)}
                        >
                            <div className="profile-btn-container">
                                <TbEdit className="edit-profile-info" />
                                Edit Profile
                            </div>
                        </button>
                        <button
                            className="profile-btn-function"
                            onClick={() => setShowModal(true)}
                            data-testid="profile-add-image"
                        >
                            <div className="profile-btn-container">
                                <FaFileUpload className="file-upload-image" />
                                Add images
                            </div>
                        </button>
                    </section>
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
                {showEditModal && (
                    <EditProfileModal user={user} setShowEditModal={setShowEditModal} />
                )}
            </div>
        </>
    );
}

export default Profile;
