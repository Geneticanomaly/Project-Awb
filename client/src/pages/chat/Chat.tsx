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
import {User, UserMessage} from '../../../typings';
import {addMessage} from '../../api/addMessage';
import {getUser} from '../../api/getUser';
import {useNavigate} from 'react-router-dom';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';

function Chat() {
    const [currentUser, setCurrentUser] = useState<User>();
    const [otherUser, setOtherUser] = useState<User>();
    const [currentUserMessages, setCurrentUserMessages] = useState<UserMessage[]>([]);
    const [otherUserMessages, setOtherUserMessages] = useState<UserMessage[]>([]);
    const [refreshMessages, setRefreshMessages] = useState(false);
    const [cookies] = useCookies(['UserId', 'AuthToken']);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    // Access the userId parameter from the URL
    const {userId} = useParams<{userId: string}>();

    useEffect(() => {
        // Get the current user's information for message component
        const getCurrentUser = async () => {
            try {
                const response = await getUser(cookies.UserId);
                setCurrentUser(response);
            } catch (error) {
                console.error('Error fetching current user data', error);
            }
        };

        const getOtherUser = async () => {
            try {
                // Get the other user's information for header and message component
                const response = await getUser(userId);
                setOtherUser(response);
            } catch (error) {
                console.error('Error fetching other user data', error);
            }
        };

        const fetchData = async () => {
            try {
                await getCurrentUser();
                await getOtherUser();
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data', error);
                setLoading(false); // Handle loading state in case of an error
            }
        };

        // If AuthToken does not exist or is undefined restrict access
        if (cookies.AuthToken === 'undefined' || !cookies.AuthToken) {
            navigate('/');
        } else {
            fetchData();
        }
    }, [cookies.AuthToken, cookies.UserId, navigate, userId]);

    useEffect(() => {
        const getCurrentUserMessages = async () => {
            try {
                // Get the logged in user's chat messages
                const response = await getUsersChat(userId, cookies.UserId);
                setCurrentUserMessages(response);
            } catch (error) {
                console.error('Error fetching current user messages', error);
            }
        };

        const getOtherUserMessages = async () => {
            try {
                // Get the other user's chat messages
                const response = await getUsersChat(cookies.UserId, userId);
                setOtherUserMessages(response);
            } catch (error) {
                console.error('Error fetching other user messages', error);
            }
        };

        getCurrentUserMessages();
        getOtherUserMessages();
    }, [cookies.UserId, userId, refreshMessages]);

    const handleSendMessage = async (messageContent: string, formattedDate: string) => {
        await addMessage(cookies.UserId, userId, messageContent, formattedDate);
        // After sending a message, setRefreshMessages to true to trigger a refresh
        setRefreshMessages((prev) => !prev);
    };

    if (loading) {
        // If AuthToken does not exist or is undefined restrict access
        if (cookies.AuthToken === 'undefined' || !cookies.AuthToken) {
            navigate('/');
        }
        return <LoadingSpinner />;
    }

    return (
        <>
            <div className="chat-background"></div>
            <div className="chat-container">
                <header className="chat-header">
                    <div className="chat-header-profile">
                        <Link className="link" to={`/profile/${userId}`}>
                            <img
                                src={`data:${otherUser?.url.mimetype};base64,${otherUser?.url.buffer.toString()}`}
                                className="chat-header-img"
                            />
                        </Link>
                        <p>
                            {otherUser?.first_name} {otherUser?.last_name}
                        </p>
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
                    currentUser={currentUser}
                    otherUser={otherUser}
                    currentUserMessages={currentUserMessages}
                    otherUserMessages={otherUserMessages}
                />
                <InputMessage handleSendMessage={handleSendMessage} />
            </div>
        </>
    );
}

export default Chat;
