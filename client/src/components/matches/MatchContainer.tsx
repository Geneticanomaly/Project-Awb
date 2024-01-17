import {Link} from 'react-router-dom';
import MatchCard from './MatchCard';
import './MatchContainer.css';
import {FaPeopleArrows} from 'react-icons/fa';
import {User} from '../../../typings';
import {useState, useEffect, useMemo} from 'react';
import {getMatchedUsers} from '../../api/getMatchedUsers';

type MatchContainerProps = {
    user?: User;
};

function MatchContainer({user}: MatchContainerProps) {
    const [matchedUsers, setMatchedUsers] = useState<User[]>([]);

    const matchedUserIds = useMemo(() => {
        return user?.matches?.map(({user_id}) => user_id) || [];
    }, [user]);

    useEffect(() => {
        const fetchMatchedUsers = async () => {
            try {
                // Call a GET request that fetches the user's matched users (liked users)
                const fetchedMatchedUsers = await getMatchedUsers(matchedUserIds);
                setMatchedUsers(fetchedMatchedUsers);
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
        <div className="matches" data-testid="match-container">
            <header className="matches-header">
                <section className="profile-container">
                    <Link
                        className="link"
                        to={`/profile/${user?.user_id}`}
                        data-testid="profile-page-link"
                    >
                        <img
                            src={`data:${user?.url.mimetype};base64,${user?.url.buffer.toString()}`}
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
        </div>
    );
}

export default MatchContainer;
