import {UserMessage} from '../../../typings';
import './Messages.css';
import Message from './message/Message';

type MessagesProps = {
    currentUserMessages: UserMessage[];
    otherUserMessages: UserMessage[];
};

function Messages({currentUserMessages, otherUserMessages}: MessagesProps) {
    return (
        <div className="messages">
            {currentUserMessages.map((message, index) => (
                <Message
                    key={index}
                    message={message.message}
                    timestamp={message.timestamp}
                    isCurrentUser={true}
                />
            ))}
            {otherUserMessages.map((message, index) => (
                <Message
                    key={index}
                    message={message.message}
                    timestamp={message.timestamp}
                    isCurrentUser={false}
                />
            ))}
        </div>
    );
}

export default Messages;
