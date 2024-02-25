import {Link} from 'react-router-dom';
import {User} from '../../../../typings';
import './Message.css';

type MessageProps = {
    message: string;
    timestamp: string;
    currentUser: User | undefined;
    otherUser: User | undefined;
    isCurrentUser: boolean;
};

function Message({message, timestamp, currentUser, otherUser, isCurrentUser}: MessageProps) {
    const messageClass = isCurrentUser ? 'message owner' : 'message';
    const isStringMessage = typeof message === 'string';

    const dateTime = new Date(timestamp);
    const localTime = new Date(dateTime.getTime() + dateTime.getTimezoneOffset() * 60000);

    const time = localTime.toLocaleTimeString([], {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div className={messageClass} data-testid="message-item">
            <div className="message-info">
                <Link className="link" to={`/profile/${isCurrentUser ? currentUser?.user_id : otherUser?.user_id}`}>
                    <img
                        src={
                            isCurrentUser
                                ? `data:${currentUser?.url?.mimetype};base64,${currentUser?.url?.buffer?.toString()}`
                                : `data:${otherUser?.url?.mimetype};base64,${otherUser?.url?.buffer?.toString()}`
                        }
                        className="message-profile-img"
                    />
                </Link>
                <p>{time}</p>
            </div>
            <div className="message-content">{isStringMessage && <p className="sent-message">{message}</p>}</div>
        </div>
    );
}

export default Message;
