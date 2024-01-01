import {Link} from 'react-router-dom';
import MatchCard from './MatchCard';
import './MatchContainer.css';
import {FaPeopleArrows} from 'react-icons/fa';
import {User} from '../../api/getUser';
import {useState, useEffect, useMemo} from 'react';
import {getMatchedUsers} from '../../api/getMatchedUsers';

type MatchContainerProps = {
    user?: User;
};

function MatchContainer({user}: MatchContainerProps) {
    const [matchedUsers, setMatchedUsers] = useState();

    /* const matchedUserIds = user?.matches.map(({user_id}) => user_id); */

    const matchedUserIds = useMemo(() => {
        return user?.matches.map(({user_id}) => user_id) || [];
    }, [user]);

    useEffect(() => {
        const fetchMatchedUsers = async () => {
            const matchedUsers = await getMatchedUsers(matchedUserIds);
            setMatchedUsers(matchedUsers);
            console.log('Matched Users:', matchedUsers);
        };
        fetchMatchedUsers();
    }, [matchedUserIds]);

    return (
        <div className="matches">
            <header className="matches-header">
                <section className="profile-container">
                    <Link className="link" to="/profile/:userId">
                        <img src={user?.url} />
                    </Link>
                    <Link className="link" to="/profile/:userId">
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
                {matchedUsers?.map((match, index) => (
                    <MatchCard
                        key={index}
                        name={match.first_name + ' ' + match.last_name}
                        img={match.url}
                    />
                ))}
            </div>
        </div>
    );
}

export default MatchContainer;
