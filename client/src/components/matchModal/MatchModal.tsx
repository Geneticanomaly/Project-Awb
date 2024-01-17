import {User} from '../../../typings';
import './MatchModal.css';
import {AiFillMessage} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';

type MatchModalProps = {
    setShowMatchModal: React.Dispatch<React.SetStateAction<boolean>>;
    matchedUser: User | undefined;
};

function MatchModal({setShowMatchModal, matchedUser}: MatchModalProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/chat/${matchedUser?.user_id}`);
    };

    return (
        <>
            <div className="modal-background" onClick={() => setShowMatchModal(false)}></div>
            <div className="modal">
                <div className="match-modal-container">
                    <h2>You have a new match!</h2>
                    {matchedUser?.first_name} {matchedUser?.last_name}
                    <img
                        className="match-modal-img"
                        src={`data:${
                            matchedUser?.url.mimetype
                        };base64,${matchedUser?.url.buffer.toString()}`}
                    />
                    <button className="match-modal-chat-btn" onClick={handleClick}>
                        <AiFillMessage size={20} /> Start chatting
                    </button>
                </div>
            </div>
        </>
    );
}

export default MatchModal;
