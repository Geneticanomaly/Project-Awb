import {useState, useEffect} from 'react';
import './Dashboard.css';
import MatchContainer from '../../components/matches/MatchContainer';
import {useCookies} from 'react-cookie';
import {getUser} from '../../api/getUser';
import {getUsersByGender} from '../../api/getUsersByGender';
import MobileNav from '../../components/navbar/mobile/MobileNav';
import {User} from '../../../typings';
import {useNavigate} from 'react-router-dom';
import CardContainer from '../../components/cardContainer/CardContainer';
import MatchModal from '../../components/matchModal/MatchModal';

function Dashboard() {
    const [user, setUser] = useState<User>();
    const [userPrevMatches, setUserPrevMatches] = useState<{user_id: string}[] | undefined>([]);
    const [usersByGender, setUsersByGender] = useState<User[]>([]);
    const [matchedUser, setMatchedUser] = useState<User>();
    const [cookies] = useCookies(['UserId', 'AuthToken']);
    const [loading, setLoading] = useState(true);
    const [reloadMatchContainer, setReloadMatchContainer] = useState<boolean>(false);
    const [showMatchModal, setShowMatchModal] = useState<boolean>(false);

    const pixelAmount: number = 500;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

    // Helper function
    async function getMatchedUserProfile(newUserData: User | undefined) {
        let isNewUser = false;
        let userId = '';

        for (const match of newUserData!.matches) {
            const matchUserId = match.user_id;

            // Check if matchUserId is not in the userPrevMatches
            // If it is, it means new user was found
            if (!userPrevMatches?.some((prevMatch) => prevMatch.user_id === matchUserId)) {
                // New user was found
                isNewUser = true;
                // Get the newly found userId
                userId = matchUserId;
            }
        }

        if (isNewUser) {
            const newMatchedUser = await getUser(userId);
            setMatchedUser(newMatchedUser);

            // Check if logged in user is in new user's matches
            const isCurrentUserMatched = newMatchedUser.matches.some(
                (match) => match.user_id === cookies.UserId
            );

            // If logged in user is in the other user's matches show a pop up.
            if (isCurrentUserMatched) {
                setShowMatchModal(true);
            } else {
                console.log('Current user is not in the matches');
            }
        }
        // Reset isNewUser value
        isNewUser = false;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get logged in user's information
                const newUser = await getUser(cookies.UserId);
                setUser(newUser);

                // If userPrevMatches hasn't been initialized
                // Set it as the logged in user's current matches
                if (!userPrevMatches || userPrevMatches.length == 0) {
                    setUserPrevMatches(newUser.matches);
                }

                // Get users by gender
                const newUsers = await getUsersByGender(newUser?.show_gender);
                setUsersByGender(newUsers);

                setLoading(false); // Set loading to false once data is fetched
                return newUser;
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        // Acquire the returned value
        fetchData().then((newUserData) => {
            // User has swiped right if reloadMatchContainer equals true
            if (reloadMatchContainer) {
                setReloadMatchContainer(false);

                // Check if the current user's newly fetched matches array does not equal
                // the previous value of the matches array.
                if (newUserData?.matches != userPrevMatches) {
                    getMatchedUserProfile(newUserData);
                }
            }
        });
    }, [reloadMatchContainer]);

    useEffect(() => {
        // Disable overflow when the Dashboard page mounts
        document.body.classList.add('body-overflow-hidden');

        // Update the window width when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            document.body.classList.remove('body-overflow-hidden');
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Render loading indicator or return null for TinderCard components during loading
    if (loading) {
        // If AuthToken does not exist or is undefined restrict access
        if (cookies.AuthToken === 'undefined' || !cookies.AuthToken) {
            navigate('/');
        }
        return <p>Loading...</p>;
    }

    return (
        <div className="dashboard-container">
            {windowWidth < pixelAmount && <MobileNav isInMatchesView={false} />}
            <div className="dashboard">
                {windowWidth >= pixelAmount && <MatchContainer user={user} />}
                <div className="swipe-container">
                    <CardContainer
                        user={user}
                        usersByGender={usersByGender}
                        cookiesUserId={cookies.UserId}
                        setReloadMatchContainer={setReloadMatchContainer}
                    />
                </div>
            </div>
            {showMatchModal && (
                <MatchModal setShowMatchModal={setShowMatchModal} matchedUser={matchedUser} />
            )}
        </div>
    );
}

export default Dashboard;
