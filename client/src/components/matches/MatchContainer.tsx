import {Link} from 'react-router-dom';
import MatchCard from './MatchCard';
import './MatchContainer.css';
import {FaPeopleArrows} from 'react-icons/fa';
import {User} from '../../api/getUser';

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

type MatchContainerProps = {
    user?: User;
};

function MatchContainer({user}: MatchContainerProps) {
    const characters = db;

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
                {characters.length > 0 ? (
                    characters.map((character, index) => (
                        <MatchCard key={index} name={character.name} img={character.url} />
                    ))
                ) : (
                    <p>No matches</p>
                )}
            </div>
        </div>
    );
}

export default MatchContainer;
