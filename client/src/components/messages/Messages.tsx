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
    // Merge both message arrays to one.
    const allMessages = [...currentUserMessages, ...otherUserMessages];

    // Sort the messages by time
    const sortedMessages = allMessages.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // console.log(sortedMessages);

    return (
        <div className="messages">
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
