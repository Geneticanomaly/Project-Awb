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

function Dashboard() {
    const [user, setUser] = useState<User>();
    // const [userPrevMatches, setUserPrevMatches] = useState<{user_id: string}[] | undefined>([])
    const [usersByGender, setUsersByGender] = useState<User[]>([]);
    const [cookies] = useCookies(['UserId', 'AuthToken']);
    const [loading, setLoading] = useState(true);
    const [reloadMatchContainer, setReloadMatchContainer] = useState(false);

    const pixelAmount: number = 500;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newUser = await getUser(cookies.UserId);
                setUser(newUser);

                const newUsers = await getUsersByGender(newUser?.show_gender);
                setUsersByGender(newUsers);

                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        if (reloadMatchContainer) {
            setReloadMatchContainer(false);
            // setUserPrevMatches(user?.matches)
        }
        fetchData();
    }, [cookies.UserId, user?.show_gender, reloadMatchContainer, user]);

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

    // console.log('Previous matches', currentUserMatches);
    // console.log('New matches', user?.matches);

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
        </div>
    );
}

export default Dashboard;
