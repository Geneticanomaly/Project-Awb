import {Link} from 'react-router-dom';
import MatchCard from './MatchCard';
import './MatchContainer.css';
import {FaPeopleArrows} from 'react-icons/fa';

const db = [
    {
        name: 'Richard Hendricks',
        url: 'https://i.imgur.com/oPj4A8u.jpeg',
    },
    {
        name: 'Erlich Bachman',
        url: 'https://i.imgur.com/Q9WPlWA.jpeg',
    },
    {
        name: 'Monica Hall',
        url: 'https://i.imgur.com/MWAcQRM.jpeg',
    },
    {
        name: 'Jared Dunn',
        url: 'https://i.imgur.com/OckVkRo.jpeg',
    },
    {
        name: 'Dinesh Chugtai',
        url: 'https://i.imgur.com/dmwjVjG.jpeg',
    },
];

function MatchContainer() {
    const characters = db;

    return (
        <div className="matches">
            <header className="matches-header">
                <section className="profile-container">
                    <Link className="link" to="/profile/:userId">
                        <img src="https://i.imgur.com/dmwjVjG.jpeg" />
                    </Link>
                    <Link className="link" to="/profile/:userId">
                        <h2>Richard Hendricks</h2>
                    </Link>
                </section>
                <section className="title">
                    <h2>Matches</h2>
                    <FaPeopleArrows className="header-icon" size={30} />
                </section>
            </header>
            <div className="matches-container">
                {characters.map((character) => (
                    <MatchCard name={character.name} img={character.url} />
                ))}
            </div>
        </div>
    );
}

export default MatchContainer;
