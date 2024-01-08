import {Link} from 'react-router-dom';
import './MatchCard.css';

type MatchProps = {
    userId: string;
    name: string;
    img: string;
};

function MatchCard({name, img, userId}: MatchProps) {
    return (
        <div className="match-card">
            <Link className="link" to={`/profile/${userId}`}>
                <img src={img} />
            </Link>

            <div className="info-container">
                <p>Something</p>
                <p>{name}</p>
            </div>

            <Link className="btn-link" to={`/chat/${userId}`}>
                <button>Chat</button>
            </Link>
        </div>
    );
}

export default MatchCard;
