import './InputMessage.css';
import {CiImageOn} from 'react-icons/ci';
import {HiOutlineMicrophone} from 'react-icons/hi2';
import {useState} from 'react';
import {addMessage} from '../../../api/addMessage';

type InputMessageProps = {
    otherUserId: string | undefined;
    currentUserId: string;
};

function InputMessage({otherUserId, currentUserId}: InputMessageProps) {
    const [messageContent, setMessageContent] = useState<string | undefined>();

    const currentDate = new Date();
    const currentTime = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
    // This will give you a string in the "YYYY-MM-DDTHH:mm:ss.sssZ" format
    const formattedDate = currentTime.toISOString();

    const handleMessageSend = async () => {
        if (messageContent) {
            const sentMessage = await addMessage(
                currentUserId,
                otherUserId,
                messageContent,
                formattedDate
            );
            console.log(sentMessage);
        }
        // setMessageContent('');
    };

    return (
        <div className="input-message">
            <HiOutlineMicrophone size={25} className="input-voice-icon" />
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setMessageContent(e.target.value)}
            />
            <div className="send">
                <input type="file" style={{display: 'none'}} id="file" />
                <label htmlFor="file">
                    <CiImageOn size={25} />
                </label>
                <button className="send-button" onClick={handleMessageSend}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default InputMessage;
