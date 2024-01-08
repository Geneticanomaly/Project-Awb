import {UserMessages} from '../../../typings';
import './Messages.css';
import Message from './message/Message';

type MessagesProps = {
    currentUserMessages: UserMessages[];
    otherUserMessages: UserMessages[];
};

function Messages({currentUserMessages, otherUserMessages}: MessagesProps) {
    return (
        <div className="messages">
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    );
}

export default Messages;
