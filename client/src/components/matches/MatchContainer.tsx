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

    // Wrapping this in useMemo disabled an infinite loop with the useEffect hook
    const matchedUserIds = useMemo(() => {
        return user?.matches?.map(({user_id}) => user_id) || [];
    }, [user]);

    /* const matchedUserIds = user?.matches?.map(({user_id}) => user_id); */

    useEffect(() => {
        const fetchMatchedUsers = async () => {
            try {
                const matchedUsers = await getMatchedUsers(matchedUserIds);
                setMatchedUsers(matchedUsers);
            } catch (error) {
                console.error('Error fetching MatchContainer data:', error);
            }
        };
        fetchMatchedUsers();
    }, [matchedUserIds]);

    const filteredMatchedProfiles = matchedUsers?.filter(
        (matchedUsers) =>
            matchedUsers.matches.filter((profile) => profile.user_id == user?.user_id).length > 0
    );

    // console.log('Current user', currentUser);

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
                    <MatchCard
                        key={index}
                        userId={match.user_id}
                        name={match.first_name + ' ' + match.last_name}
                        img={match.url}
                        matchKey={index.toString()}
                    />
                ))}
            </div>
        </div>
    );
}

export default MatchContainer;
