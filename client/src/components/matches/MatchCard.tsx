import {Link, useNavigate} from 'react-router-dom';
import './MatchCard.css';
import {User} from '../../../typings';
import {calculateAge} from '../../helperFunctions';

type MatchProps = {
    match: User;
    matchKey: string;
};

function MatchCard({match, matchKey}: MatchProps) {
    const age = calculateAge(parseInt(match.dob_day), parseInt(match.dob_month), parseInt(match.dob_year));

    const navigate = useNavigate();

    return (
        <div className="match-card">
            <Link className="link" to={`/profile/${match.user_id}`}>
                <img
                    src={`data:${match.url.mimetype};base64,${match.url.buffer.toString()}`}
                    data-testid={`match-profile-${matchKey}`}
                />
            </Link>

            <div className="info-container">
                <p>{age} Years old</p>
                <p onClick={() => navigate(`/profile/${match.user_id}`)}>
                    {match.first_name} {match.last_name}
                </p>
            </div>

            <Link className="btn-link" to={`/chat/${match.user_id}`} data-testid={`chat-btn-${matchKey}`}>
                <button>Chat</button>
            </Link>
        </div>
    );
}

export default MatchCard;
