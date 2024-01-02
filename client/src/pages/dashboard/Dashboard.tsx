import TinderCard from 'react-tinder-card';
import React, {useState, useRef, useMemo, useEffect} from 'react';
import './Dashboard.css';
import MatchContainer from '../../components/matches/MatchContainer';

import {IoMdClose} from 'react-icons/io';
import {FaHeart} from 'react-icons/fa';
import {useCookies} from 'react-cookie';
import {getUser, User} from '../../api/getUser';
import {getUsersByGender} from '../../api/getUsersByGender';
import {addMatch} from '../../api/addMatch';

function Dashboard() {
    const [user, setUser] = useState<User>();
    const [usersByGender, setUsersByGender] = useState<User[]>([]);
    const [cookies, setCookie, removeCookie] = useCookies(['UserId', 'AuthToken']);
    const [currentIndex, setCurrentIndex] = useState<number>(usersByGender.length - 1);
    const [lastDirection, setLastDirection] = useState<string | undefined>();
    const [loading, setLoading] = useState(true);

    // used for outOfFrame closure
    const currentIndexRef = useRef<number>(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(usersByGender.length)
                .fill(0)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map(() => React.createRef<any>()),
        [usersByGender.length]
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canSwipe = currentIndex >= 0;

    const updateMatches = async (matchedUserId: string) => {
        addMatch(cookies.UserId, matchedUserId);
    };

    // set last direction and decrease current index
    const swiped = (direction: string, swipedUserId: string, index: number) => {
        if (direction === 'right') {
            updateMatches(swipedUserId);
        }
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    };

    const outOfFrame = (name: string, idx: number) => {
        console.log(`Swiped ${name} (${idx})`, currentIndexRef.current);
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    };

    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < usersByGender.length) {
            console.log('Swiped to the ' + dir);
            await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
        }
    };

    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(cookies.UserId);

    // Filter the users
    const filteredGenderedUsers = usersByGender?.filter(
        (user) => !matchedUserIds?.includes(user.user_id)
    );

    useEffect(() => {
        // Disable overflow when the Dashboard page mounts
        document.body.classList.add('body-overflow-hidden');

        // Remove the the overflow on dismount
        return () => {
            document.body.classList.remove('body-overflow-hidden');
        };
    }, []);

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

        fetchData();
    }, [cookies.UserId, user?.show_gender]);

    // Render loading indicator or return null for TinderCard components during loading
    if (loading) {
        return <p>Loading...</p>;
    }

    console.log(user);
    console.log(typeof user?.matches);

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <MatchContainer user={user} />
                <div className="swipe-container">
                    <div className="card-container">
                        {filteredGenderedUsers?.map((user, index) => (
                            <TinderCard
                                ref={childRefs[index]}
                                className="swipe"
                                key={user.user_id}
                                onSwipe={(dir) => swiped(dir, user.user_id, index)}
                                onCardLeftScreen={() =>
                                    outOfFrame(user.first_name + user.last_name, index)
                                }
                            >
                                <div
                                    style={{backgroundImage: 'url(' + user.url + ')'}}
                                    className="card"
                                >
                                    <h3>
                                        {user.first_name} {user.last_name}
                                    </h3>
                                </div>
                            </TinderCard>
                        ))}
                        <div className="button-container">
                            <button onClick={() => swipe('left')}>
                                <IoMdClose
                                    className="button-icon"
                                    size={30}
                                    color="rgb(219, 54, 54)"
                                />
                            </button>
                            <button onClick={() => swipe('right')}>
                                <FaHeart
                                    className="button-icon"
                                    size={25}
                                    color="rgb(95, 218, 95)"
                                />
                            </button>
                        </div>
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
