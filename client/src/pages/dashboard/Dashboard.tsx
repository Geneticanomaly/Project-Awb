import TinderCard from 'react-tinder-card';
import {useState, useRef, useMemo, useEffect} from 'react';
import './Dashboard.css';
import MatchContainer from '../../components/matches/MatchContainer';
import React from 'react';

import {IoMdClose} from 'react-icons/io';
import {FaHeart} from 'react-icons/fa';

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
    const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);
    const [lastDirection, setLastDirection] = useState<string | undefined>();
    // used for outOfFrame closure
    const currentIndexRef = useRef<number>(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map(() => React.createRef<any>()),
        []
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canSwipe = currentIndex >= 0;

    // set last direction and decrease current index
    const swiped = (direction: string, nameToDelete: string, index: number) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    };

    const outOfFrame = (name: string, idx: number) => {
        console.log(`Swiped ${name} (${idx})`, currentIndexRef.current);
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    };

    const swipe = async (dir: string) => {
        if (canSwipe && currentIndex < db.length) {
            console.log('Swiped to the ' + dir);
            await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
        }
    };

    useEffect(() => {
        // Disable overflow when the Dashboard page mounts
        document.body.classList.add('body-overflow-hidden');

        // Remove the the overflow on dismount
        return () => {
            document.body.classList.remove('body-overflow-hidden');
        };
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <MatchContainer />
                <div className="swipe-container">
                    <div className="card-container">
                        {db.length > 0 ? (
                            db.map((character, index) => (
                                <TinderCard
                                    ref={childRefs[index]}
                                    className="swipe"
                                    key={character.name}
                                    onSwipe={(dir) => swiped(dir, character.name, index)}
                                    onCardLeftScreen={() => outOfFrame(character.name, index)}
                                >
                                    <div
                                        style={{backgroundImage: 'url(' + character.url + ')'}}
                                        className="card"
                                    >
                                        <h3>{character.name}</h3>
                                    </div>
                                </TinderCard>
                            ))
                        ) : (
                            <p>Out of possible dating candidates...</p>
                        )}
                        <div className="button-container">
                            <button onClick={() => swipe('left')}>
                                <IoMdClose
                                    className="button-icon"
                                    size={30}
                                    color="rgb(219, 54, 54)"
                                />
                            </button>
                            <button onClick={() => swipe('right')}>
                                <FaHeart
                                    className="button-icon"
                                    size={25}
                                    color="rgb(95, 218, 95)"
                                />
                            </button>
                        </div>
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
