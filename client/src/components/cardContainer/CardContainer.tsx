import TinderCard from 'react-tinder-card';
import {useState, useEffect, useMemo, useRef} from 'react';
import {User} from '../../../typings';
import React from 'react';
import {addMatch} from '../../api/addMatch';
import '../../pages/dashboard/Dashboard.css';
import {calculateAge} from '../../helperFunctions';

type CardContainerProps = {
    user: User | undefined;
    usersByGender: User[];
    cookiesUserId: string;
    setReloadMatchContainer: React.Dispatch<React.SetStateAction<boolean>>;
};

function CardContainer({user, usersByGender, cookiesUserId, setReloadMatchContainer}: CardContainerProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastDirection, setLastDirection] = useState<string | undefined>();
    const pixelAmount: number = 500;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // used for outOfFrame closure
    const currentIndexRef = useRef<number>(currentIndex);

    const childRefs = useMemo(
        () =>
            Array(usersByGender.length)
                .fill(0)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map(() => React.createRef<any>()),
        [usersByGender.length]
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const updateMatches = async (matchedUserId: string) => {
        addMatch(cookiesUserId, matchedUserId);
    };

    // Set last direction and decrease current index
    const swiped = (direction: string, swipedUserId: string, index: number) => {
        if (direction === 'right') {
            updateMatches(swipedUserId);
            // Reload the useEffect hook for user searching - in case there is a new match
            setReloadMatchContainer(true);
        }
        setLastDirection(direction);
        console.log('INDEX:', index);
        updateCurrentIndex(index - 1);
    };

    const outOfFrame = (name: string, idx: number) => {
        console.log(`Swiped ${name} (${idx})`, currentIndexRef.current);
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    };

    // Get the user's matched user ids
    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(cookiesUserId);

    // Create a new array that has the correct gendered users
    // The array only includes users that are not in the current user's matches array.
    const filteredGenderedUsers = usersByGender?.filter((user) => !matchedUserIds?.includes(user.user_id));

    useEffect(() => {
        if (filteredGenderedUsers) {
            setCurrentIndex(filteredGenderedUsers.length - 1);
        }
    }, [filteredGenderedUsers, user]);

    useEffect(() => {
        // Disable overflow when the Dashboard page mounts
        document.body.classList.add('body-overflow-hidden');

        // Update the window width when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            document.body.classList.remove('body-overflow-hidden');
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="card-container">
            {windowWidth < pixelAmount && <p>Swipe away!</p>}
            {filteredGenderedUsers?.map((user, index) => (
                <TinderCard
                    ref={childRefs[index]}
                    className="swipe"
                    key={user.user_id}
                    onSwipe={(dir) => swiped(dir, user.user_id, index)}
                    onCardLeftScreen={() => outOfFrame(user.first_name + user.last_name, index)}
                >
                    <div
                        style={{
                            backgroundImage:
                                'url(' + `data:${user?.url?.mimetype};base64,${user?.url?.buffer?.toString()}` + ')',
                        }}
                        className="card"
                    >
                        <h3>
                            {user.first_name} {user.last_name},{' '}
                            {calculateAge(parseInt(user.dob_day), parseInt(user.dob_month), parseInt(user.dob_year))}
                        </h3>
                        <p>{user.about}</p>
                    </div>
                </TinderCard>
            ))}
            <div className="swipe-info">{lastDirection ? <p>You swiped {lastDirection}</p> : <p />}</div>
        </div>
    );
}

export default CardContainer;
