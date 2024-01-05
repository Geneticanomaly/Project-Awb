import './Chat.css';
import {IoSearchSharp} from 'react-icons/io5';
import {MdMoreVert} from 'react-icons/md';
import {IoIosArrowBack} from 'react-icons/io';
import Messages from '../../components/messages/Messages';
import InputMessage from '../../components/messages/inputMessage/InputMessage';
import {Link} from 'react-router-dom';

function Chat() {
    return (
        <>
            <div className="chat-background"></div>
            <div className="chat-container">
                <header className="chat-header">
                    <div className="chat-header-profile">
                        <img src="https://i.imgur.com/Q9WPlWA.jpeg" className="chat-header-img" />
                        <p>Thomas Kaatranen</p>
                    </div>

                    <div className="chat-header-icons">
                        <Link to="/dashboard" className="link-icon">
                            <IoIosArrowBack size={20} />
                        </Link>
                        <IoSearchSharp size={20} />
                        <MdMoreVert size={20} />
                    </div>
                </header>
                <Messages />
                <InputMessage />
            </div>
        </>
    );
}

export default Chat;
