import {useCookies} from 'react-cookie';
import {User, getUser} from '../../api/getUser';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './Profile.css';
import {FaFileUpload} from 'react-icons/fa';
import AddImageModal from '../../components/addImageModal/AddImageModal';

const db = [
    {
        url: 'https://i.imgur.com/oPj4A8u.jpeg',
    },
    {
        url: 'https://i.imgur.com/Q9WPlWA.jpeg',
    },
    {
        url: 'https://i.imgur.com/MWAcQRM.jpeg',
    },
    {
        url: 'https://i.imgur.com/OckVkRo.jpeg',
    },
    {
        url: 'https://i.imgur.com/dmwjVjG.jpeg',
    },
];

function Profile() {
    const [user, setUser] = useState<User>();
    const [cookies, setCookie, removeCookie] = useCookies(['UserId', 'AuthToken']);
    const [showModal, setShowModal] = useState<boolean>(false);

    // Access the userId parameter from the URL
    const {userId} = useParams<{userId: string}>();

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUser(userId);
            setUser(response);
        };
        fetchUserData();
        console.log('Fetch user data based on id!');
    }, [userId]);

    console.log(user);

    return (
        <div className="profile-page-container">
            <div className="profile-info-container">
                <img src={user?.url} />
                <div className="profile-info">
                    <h2>Registration date</h2>
                    <h2>{user?.email}</h2>
                    <h2>{user?.first_name + ' ' + user?.last_name}</h2>
                </div>
            </div>

            {/* <input type="file" id="upload-image" className="custom-file-input" /> */}
            <button className="profile-add-image" onClick={() => setShowModal(true)}>
                <div className="img-btn-container">
                    <FaFileUpload className="file-upload-image" />
                    Add images
                </div>
            </button>

            <div className="about">
                <h2>About me</h2>
                <p>{user?.about}</p>
            </div>
            <div className="line" />
            {db.length > 0 ? (
                <section className="images-container">
                    {db.map((image, index) => (
                        <img key={index} src={image.url} />
                    ))}
                </section>
            ) : (
                <p className="image-msg">This profile has no images...</p>
            )}
            {showModal && <AddImageModal setShowModal={setShowModal} />}
        </div>
    );
}

export default Profile;
