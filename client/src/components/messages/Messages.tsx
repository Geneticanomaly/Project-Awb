import {useEffect, useMemo, useRef} from 'react';
import {User, UserMessage} from '../../../typings';
import './Messages.css';
import Message from './message/Message';

type MessagesProps = {
    currentUser: User | undefined;
    otherUser: User | undefined;
    currentUserMessages: UserMessage[];
    otherUserMessages: UserMessage[];
};

function Messages({currentUser, otherUser, currentUserMessages, otherUserMessages}: MessagesProps) {
    // Wrap the array creation in useMemo to memoize it
    // Resolves an issue with the useEffect hook
    // The useEffect would be triggered on every render since the dependencies change
    const allMessages = useMemo(
        () => [...currentUserMessages, ...otherUserMessages],
        [currentUserMessages, otherUserMessages]
    );

    const listRef = useRef<HTMLDivElement>(null);

    function scrollToLastMessage() {
        // Get the last child element from the element that the listRef is attached to
        const lastChild = listRef.current?.lastElementChild;
        lastChild?.scrollIntoView({
            block: 'end',
            inline: 'nearest',
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        scrollToLastMessage();
    }, [allMessages]); // Trigger the useEffect whenever the messages change

    // Sort the messages by time
    const sortedMessages = allMessages.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return (
        <div className="messages" ref={listRef}>
            {sortedMessages.map((message, index) => (
                <Message
                    key={index}
                    message={message.message}
                    timestamp={message.timestamp}
                    currentUser={currentUser}
                    otherUser={otherUser}
                    isCurrentUser={currentUserMessages.includes(message)}
                />
            ))}
        </div>
    );
}

export default Messages;
