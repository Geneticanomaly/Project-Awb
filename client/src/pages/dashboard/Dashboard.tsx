import Navbar from '../../components/navbar/Navbar';
import TinderCard from 'react-tinder-card';
import {useState} from 'react';
import './Dashboard.css';
import MatchContainer from '../../components/matches/MatchContainer';

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

function Dashboard() {
    const characters = db;
    const [lastDirection, setLastDirection] = useState();

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
    };

    const outOfFrame = (name: string) => {
        console.log(name + ' left the screen!');
    };

    return (
        <div className="dashboard-container">
            {/* <Navbar authToken={true} /> */}
            <div className="dashboard">
                <MatchContainer />
                <div className="swipe-container">
                    <div className="card-container">
                        {characters.map((character) => (
                            <TinderCard
                                className="swipe"
                                key={character.name}
                                onSwipe={(dir) => swiped(dir, character.name)}
                                onCardLeftScreen={() => outOfFrame(character.name)}
                            >
                                <div
                                    style={{backgroundImage: 'url(' + character.url + ')'}}
                                    className="card"
                                >
                                    <h3>{character.name}</h3>
                                </div>
                            </TinderCard>
                        ))}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
