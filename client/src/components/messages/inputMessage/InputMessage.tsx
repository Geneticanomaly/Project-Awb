import './InputMessage.css';
import {CiImageOn} from 'react-icons/ci';
import {HiOutlineMicrophone} from 'react-icons/hi2';

function InputMessage() {
    return (
        <div className="input-message">
            <HiOutlineMicrophone size={25} className="input-voice-icon" />
            <input type="text" placeholder="Type something..." />
            <div className="send">
                <input type="file" style={{display: 'none'}} id="file" />
                <label htmlFor="file">
                    <CiImageOn size={25} />
                </label>
                <button className="send-button">Send</button>
            </div>
        </div>
    );
}

export default InputMessage;
