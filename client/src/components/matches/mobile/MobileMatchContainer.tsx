import './MobileMatchContainer.css';
import '../MatchContainer.css';
import {FaPeopleArrows} from 'react-icons/fa';
import {useEffect, useMemo, useState} from 'react';
import {User} from '../../../../typings';
import MatchCard from '../MatchCard';
import {getMatchedUsers} from '../../../api/getMatchedUsers';
import {useCookies} from 'react-cookie';
import {getUser} from '../../../api/getUser';
import {Link} from 'react-router-dom';
import MobileNav from '../../navbar/mobile/MobileNav';

function MobileMatchContainer() {
    const [user, setUser] = useState<User>();
    const [matchedUsers, setMatchedUsers] = useState<User[]>([]);
    const [cookies] = useCookies(['UserId', 'AuthToken']);

    // Wrapping this in useMemo disabled an infinite loop with the useEffect hook
    const matchedUserIds = useMemo(() => {
        return user?.matches?.map(({user_id}) => user_id) || [];
    }, [user]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Call a GET request for fetching the user
                const response = await getUser(cookies.UserId);
                setUser(response);
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        if (!user) {
            fetchUserData();
        }
    }, [user, cookies.UserId]);

    useEffect(() => {
        const fetchMatchedUsers = async () => {
            try {
                // Call a GET request for fetching the user's matches (liked users)
                const matchedUsers = await getMatchedUsers(matchedUserIds);
                setMatchedUsers(matchedUsers);
            } catch (error) {
                console.error('Error fetching matched users data:', error);
            }
        };
        fetchMatchedUsers();
    }, [matchedUserIds]);

    // Filter the matchedUsers state
    // Create a new array to only include users that have like each other.
    const filteredMatchedProfiles = matchedUsers?.filter(
        (matchedUsers) =>
            matchedUsers.matches.filter((profile) => profile.user_id == user?.user_id).length > 0
    );

    return (
        <>
            <div className="mobile-match-container">
                <MobileNav isInMatchesView={true} />
                <section className="mobile-match-section">
                    <header className="matches-header">
                        <section className="profile-container">
                            <Link className="link" to={`/profile/${user?.user_id}`}>
                                <img
                                    src={`data:${
                                        user?.url?.mimetype
                                    };base64,${user?.url?.buffer?.toString()}`}
                                />
                            </Link>
                            <Link className="link" to={`/profile/${user?.user_id}`}>
                                <h2>
                                    {user?.first_name} {user?.last_name}
                                </h2>
                            </Link>
                        </section>
                        <section className="title">
                            <h2>Matches</h2>
                            <FaPeopleArrows className="header-icon" size={30} />
                        </section>
                    </header>
                    <div className="matches-container">
                        {filteredMatchedProfiles?.map((match, index) => (
                            <MatchCard key={index} match={match} matchKey={index.toString()} />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default MobileMatchContainer;
