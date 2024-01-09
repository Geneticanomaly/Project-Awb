import './Message.css';

type MessageProps = {
    message: string;
    timestamp: string;
    isCurrentUser: boolean;
};

function Message({message, timestamp, isCurrentUser}: MessageProps) {
    const messageClass = isCurrentUser ? 'message owner' : 'message';
    const isStringMessage = typeof message === 'string';
    // console.log(timestamp);

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
                <img src="https://i.imgur.com/Q9WPlWA.jpeg" className="message-profile-img" />
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
