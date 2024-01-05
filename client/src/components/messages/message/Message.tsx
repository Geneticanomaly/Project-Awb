import './Message.css';

function Message() {
    return (
        <div className="message owner">
            <div className="message-info">
                <img src="https://i.imgur.com/Q9WPlWA.jpeg" className="message-profile-img" />
                <p>Just now</p>
            </div>
            <div className="message-content">
                <p className="sent-message">Hello</p>
                {<img src="https://i.imgur.com/Q9WPlWA.jpeg" className="message-content-img" />}
            </div>
        </div>
    );
}

export default Message;
