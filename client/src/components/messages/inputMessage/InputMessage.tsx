import './InputMessage.css';
import {CiImageOn} from 'react-icons/ci';
import {HiOutlineMicrophone} from 'react-icons/hi2';
import {useState} from 'react';

type InputMessageProps = {
    handleSendMessage: (messageContent: string, formattedDate: string) => Promise<void>;
};

function InputMessage({handleSendMessage}: InputMessageProps) {
    const [messageContent, setMessageContent] = useState<string>('');

    // Get current Finnish time
    const currentDate = new Date();
    const currentTime = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
    const formattedDate = currentTime.toISOString();

    const handleMessageSend = async () => {
        // Check that the message is not empty
        if (messageContent) {
            await handleSendMessage(messageContent, formattedDate);
            setMessageContent('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Allow user to send a message when the Enter key is pressed
        if (e.key === 'Enter') {
            e.preventDefault();
            handleMessageSend();
        }
    };

    return (
        <div className="input-message">
            <HiOutlineMicrophone size={25} className="input-voice-icon" />
            <input
                data-testid="input-msg"
                type="text"
                placeholder="Type something..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className="send">
                <input type="file" style={{display: 'none'}} id="file" />
                <label htmlFor="file">
                    <CiImageOn size={25} />
                </label>
                <button className="send-button" onClick={handleMessageSend} data-testid="send-msg">
                    Send
                </button>
            </div>
        </div>
    );
}

export default InputMessage;
