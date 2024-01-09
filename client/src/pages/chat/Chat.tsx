import './Chat.css';
import {IoSearchSharp} from 'react-icons/io5';
import {MdMoreVert} from 'react-icons/md';
import {IoIosArrowBack} from 'react-icons/io';
import Messages from '../../components/messages/Messages';
import InputMessage from '../../components/messages/inputMessage/InputMessage';
import {Link, useParams} from 'react-router-dom';
import {getUsersChat} from '../../api/getUsersChat';
import {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {UserMessage} from '../../../typings';
import {addMessage} from '../../api/addMessage';

function Chat() {
    const [currentUserMessages, setCurrentUserMessages] = useState<UserMessage[]>([]);
    const [otherUserMessages, setOtherUserMessages] = useState<UserMessage[]>([]);
    const [refreshMessages, setRefreshMessages] = useState(false);

    // Access the userId parameter from the URL
    const {userId} = useParams<{userId: string}>();

    const [cookies] = useCookies(['UserId', 'AuthToken']);

    useEffect(() => {
        const getCurrentUserMessages = async () => {
            const response = await getUsersChat(userId, cookies.UserId);
            setCurrentUserMessages(response);
            // console.log('Current User Chat:', response);
        };
        const getOtherUserMessages = async () => {
            const response = await getUsersChat(cookies.UserId, userId);
            setOtherUserMessages(response);
            // console.log('Other User Chat:', response);
        };
        getCurrentUserMessages();
        getOtherUserMessages();
    }, [cookies.UserId, userId, refreshMessages]);

    const handleSendMessage = async (messageContent: string, formattedDate: string) => {
        await addMessage(cookies.UserId, userId, messageContent, formattedDate);
        // After sending a message, setRefreshMessages to true to trigger a refresh
        setRefreshMessages((prev) => !prev);
    };

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
                <Messages
                    currentUserMessages={currentUserMessages}
                    otherUserMessages={otherUserMessages}
                />
                <InputMessage handleSendMessage={handleSendMessage} />
            </div>
        </>
    );
}

export default Chat;
