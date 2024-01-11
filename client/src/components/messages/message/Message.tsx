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
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <div className={messageClass}>
            <div className="message-info">
                <Link
                    className="link"
                    to={`/profile/${isCurrentUser ? currentUser?.user_id : otherUser?.user_id}`}
                >
                    <img
                        src={
                            isCurrentUser
                                ? `data:image/jpeg;base64,${currentUser?.url}`
                                : `data:image/jpeg;base64,${otherUser?.url}`
                        }
                        className="message-profile-img"
                    />
                </Link>
                <p>{time}</p>
            </div>
            <div className="message-content">
                {isStringMessage ? (
                    <p className="sent-message">{message}</p>
                ) : (
                    <img src={message} className="message-content-img" />
                )}
                {/* <img src="https://i.imgur.com/Q9WPlWA.jpeg" className="message-content-img" /> */}
            </div>
        </div>
    );
}

export default Message;
