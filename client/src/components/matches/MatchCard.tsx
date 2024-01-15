import {Link} from 'react-router-dom';
import './MatchCard.css';
import {ProfileImage} from '../../../typings';
import {calculateAge} from '../../helperFunctions';

type MatchProps = {
    userId: string;
    name: string;
    img: ProfileImage;
    dob_day: string;
    dob_month: string;
    dob_year: string;
    matchKey: string;
};

function MatchCard({name, img, userId, dob_day, dob_month, dob_year, matchKey}: MatchProps) {
    const age = calculateAge(parseInt(dob_day), parseInt(dob_month), parseInt(dob_year));

    return (
        <div className="match-card">
            <Link className="link" to={`/profile/${userId}`}>
                <img
                    src={`data:${img.mimetype};base64,${img.buffer?.toString()}`}
                    data-testid={`match-profile-${matchKey}`}
                />
            </Link>

            <div className="info-container">
                <p>{age} Years old</p>
                <p>{name}</p>
            </div>

            <Link className="btn-link" to={`/chat/${userId}`} data-testid={`chat-btn-${matchKey}`}>
                <button>Chat</button>
            </Link>
        </div>
    );
}

export default MatchCard;
