import {Link} from 'react-router-dom';
import './MatchCard.css';

type MatchProps = {
    name: string;
    img: string;
};

function MatchCard({name, img}: MatchProps) {
    return (
        <div className="match-card">
            <Link className="link" to="/profile/:userId">
                <img src={img} />
            </Link>

            <div className="info-container">
                <p>Something</p>
                <p>{name}</p>
            </div>

            <Link className="btn-link" to="/chat">
                <button>Chat</button>
            </Link>
        </div>
    );
}

export default MatchCard;
