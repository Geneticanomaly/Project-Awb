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
                <h2>Matches</h2>
                <FaPeopleArrows className="header-icon" size={30} />
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
