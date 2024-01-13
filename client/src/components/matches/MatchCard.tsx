import {Link} from 'react-router-dom';
import './MatchCard.css';
import {ProfileImage} from '../../../typings';

type MatchProps = {
    userId: string;
    name: string;
    img: ProfileImage;
    matchKey: string;
};

function MatchCard({name, img, userId, matchKey}: MatchProps) {
    return (
        <div className="match-card">
            <Link className="link" to={`/profile/${userId}`}>
                <img
                    src={`data:image/jpeg;base64,${img}`}
                    data-testid={`match-profile-${matchKey}`}
                />
            </Link>

            <div className="info-container">
                <p>Something</p>
                <p>{name}</p>
            </div>

            <Link className="btn-link" to={`/chat/${userId}`} data-testid={`chat-btn-${matchKey}`}>
                <button>Chat</button>
            </Link>
        </div>
    );
}

export default MatchCard;
